const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const ACCOUNT_STATUS_MESSAGES = {
  pending: "Account pending approval",
  suspended: "Account suspended",
  rejected: "Account rejected",
};

const normalizeEmail = (email = "") =>
  email.trim().toLowerCase();

const buildAccountStatusPayload = (status) => ({
  message:
    ACCOUNT_STATUS_MESSAGES[status] ||
    "Account is not active",
  accountStatus: status,
});

const signAuthToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

// REGISTER USER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, adminSecretKey } = req.body;
    const normalizedEmail = normalizeEmail(email);
    const normalizedRole = role || "viewer";

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    if (!["admin", "manager", "viewer"].includes(normalizedRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role selected",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const isAdminRegistration = normalizedRole === "admin";
    let status = isAdminRegistration ? "active" : "pending";
    let approvedAt = null;

    if (isAdminRegistration) {
      if (!process.env.ADMIN_SECRET_KEY) {
        return res.status(500).json({
          success: false,
          message:
            "Admin registration is unavailable. Contact system support.",
        });
      }

      if (adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid Admin Secret Key. Registration denied.",
        });
      }

      approvedAt = new Date();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: normalizedRole,
      status,
      approvedAt,
    });

    await ActivityLog.create({
      action: isAdminRegistration ? "ADMIN_REGISTERED" : "USER_REGISTERED",
      user: user._id,
      metadata: {
        targetRole: normalizedRole,
        accountStatus: status,
      },
    });

    user.password = undefined;

    res.status(201).json({
      success: true,
      message: isAdminRegistration
        ? "Admin account created successfully."
        : "Registration successful. Your account is pending approval.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        ...buildAccountStatusPayload(user.status),
      });
    }

    const token = signAuthToken(user);

    user.password = undefined;

    await ActivityLog.create({ action: "USER_LOGIN", user: user._id });

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CURRENT USER
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.forgotPassword = async (
  req,
  res
) => {
  try {
    const normalizedEmail = normalizeEmail(
      req.body.email
    );

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If the account exists, a password reset email has been sent",
      });
    }

    const resetToken =
      crypto.randomBytes(20).toString(
        "hex"
      );

    user.resetPasswordToken =
      resetToken;

    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    const clientUrl = (
      process.env.CLIENT_URL ||
      process.env.FRONTEND_URL ||
      "http://localhost:5173"
    ).replace(/\/+$/, "");

    const resetUrl =
      `${clientUrl}/reset-password/${resetToken}`;

    const message =
      `Password Reset Link:\n\n${resetUrl}`;

    await sendEmail(
      user.email,
      "Password Reset",
      message
    );

    res.status(200).json({
      success: true,
      message:
        "Password reset email sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        req.body.password,
        10
      );

    user.password =
      hashedPassword;

    user.resetPasswordToken =
      undefined;

    user.resetPasswordExpire =
      undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password reset successful",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
