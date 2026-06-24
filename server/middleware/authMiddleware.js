const jwt = require("jsonwebtoken");
const User = require("../models/User");

const ACCOUNT_STATUS_MESSAGES = {
  pending: "Account pending approval",
  suspended: "Account suspended",
  rejected: "Account rejected",
};

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({ message: "User not found" });
    }

    if (currentUser.status !== "active") {
      return res.status(403).json({
        message:
          ACCOUNT_STATUS_MESSAGES[currentUser.status] ||
          "Account is no longer active. Access denied.",
        accountStatus: currentUser.status,
      });
    }

    req.user = {
      id: currentUser._id.toString(),
      role: currentUser.role,
      status: currentUser.status,
      email: currentUser.email,
      name: currentUser.name,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
