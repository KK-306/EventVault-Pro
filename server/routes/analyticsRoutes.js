const express = require("express");
const router = express.Router();

const {
  getDashboardAnalytics,
} = require("../controllers/analyticsController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorize,
} = require("../middleware/roleMiddleware");

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboardAnalytics
);

module.exports = router;