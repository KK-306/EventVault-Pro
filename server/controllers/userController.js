const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");

const MANAGED_ROLES = ["manager", "viewer"];

const getUserNotFound = (res) =>
  res.status(404).json({
    success: false,
    message: "User not found",
  });

const isManagedRole = (user) =>
  MANAGED_ROLES.includes(user.role);

const createLifecycleLog = async (
  action,
  actorId,
  targetUser,
  previousStatus,
  nextStatus
) => {
  await ActivityLog.create({
    action,
    user: actorId,
    metadata: {
      targetUser: targetUser._id,
      targetEmail: targetUser.email,
      targetRole: targetUser.role,
      previousStatus,
      nextStatus,
    },
  });
};

// ADMIN WORKFLOWS
exports.getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({
      status: "pending",
      role: { $in: MANAGED_ROLES },
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return getUserNotFound(res);
    }

    if (!isManagedRole(user)) {
      return res.status(403).json({
        success: false,
        message: "Admin accounts are provisioned separately.",
      });
    }

    if (user.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending accounts can be approved.",
      });
    }

    const previousStatus = user.status;
    user.status = "active";
    user.approvedBy = req.user.id;
    user.approvedAt = new Date();
    await user.save();

    await createLifecycleLog(
      "USER_APPROVED",
      req.user.id,
      user,
      previousStatus,
      user.status
    );

    user.password = undefined;

    res.status(200).json({ success: true, message: "User approved successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.rejectUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return getUserNotFound(res);
    }

    if (!isManagedRole(user)) {
      return res.status(403).json({
        success: false,
        message: "Admin accounts are provisioned separately.",
      });
    }

    if (user.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending accounts can be rejected.",
      });
    }

    const previousStatus = user.status;
    user.status = "rejected";
    user.rejectedBy = req.user.id;
    user.rejectedAt = new Date();
    await user.save();

    await createLifecycleLog(
      "USER_REJECTED",
      req.user.id,
      user,
      previousStatus,
      user.status
    );

    user.password = undefined;

    res.status(200).json({ success: true, message: "User rejected successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.suspendUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot suspend your own account.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return getUserNotFound(res);
    }

    if (!isManagedRole(user)) {
      return res.status(403).json({
        success: false,
        message: "Admin accounts cannot be suspended from this workflow.",
      });
    }

    if (user.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Only active accounts can be suspended.",
      });
    }

    const previousStatus = user.status;
    user.status = "suspended";
    user.suspendedBy = req.user.id;
    user.suspendedAt = new Date();
    await user.save();

    await createLifecycleLog(
      "USER_SUSPENDED",
      req.user.id,
      user,
      previousStatus,
      user.status
    );

    user.password = undefined;

    res.status(200).json({ success: true, message: "User suspended successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.reactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return getUserNotFound(res);
    }

    if (!isManagedRole(user)) {
      return res.status(403).json({
        success: false,
        message: "Admin accounts cannot be reactivated from this workflow.",
      });
    }

    if (!["suspended", "rejected"].includes(user.status)) {
      return res.status(400).json({
        success: false,
        message: "Only rejected or suspended accounts can be reactivated.",
      });
    }

    const previousStatus = user.status;
    user.status = "active";
    user.approvedBy = req.user.id;
    user.approvedAt = new Date();
    await user.save();

    await createLifecycleLog(
      "USER_REACTIVATED",
      req.user.id,
      user,
      previousStatus,
      user.status
    );

    user.password = undefined;

    res.status(200).json({ success: true, message: "User reactivated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password");

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

exports.updateUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
      return getUserNotFound(res);
    }

    const allowedFields = ["name", "email", "role"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (
      updates.role &&
      updates.role !== existingUser.role &&
      (updates.role === "admin" || existingUser.role === "admin")
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Admin role assignments must use secure admin provisioning.",
      });
    }

    if (updates.email) {
      updates.email = updates.email.trim().toLowerCase();
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
