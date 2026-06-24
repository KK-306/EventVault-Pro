const express = require("express");
const router = express.Router();

const {
  getActivityLogs,
} = require("../controllers/activityController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorize,
} = require("../middleware/roleMiddleware");

router.get(
  "/",
  protect,
  authorize("admin"),
  getActivityLogs
);

module.exports = router;