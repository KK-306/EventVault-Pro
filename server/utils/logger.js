const ActivityLog = require("../models/ActivityLog");

const logActivity = async (
  action,
  userId,
  metadata = {}
) => {
  try {
    await ActivityLog.create({
      action,
      user: userId,
      metadata,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = logActivity;