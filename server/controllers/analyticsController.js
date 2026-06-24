const Event = require("../models/Event");
const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");

exports.getDashboardAnalytics = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();

    const approvedEvents =
      await Event.countDocuments({
        status: "approved",
      });

    const pendingEvents =
      await Event.countDocuments({
        status: "pending",
      });

    const totalUsers =
      await User.countDocuments();

    const totalManagers =
      await User.countDocuments({
        role: "manager",
      });

    const totalViewers =
      await User.countDocuments({
        role: "viewer",
      });

    const totalLogs =
      await ActivityLog.countDocuments();

    res.status(200).json({
      success: true,
      analytics: {
        totalEvents,
        approvedEvents,
        pendingEvents,
        totalUsers,
        totalManagers,
        totalViewers,
        totalLogs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};