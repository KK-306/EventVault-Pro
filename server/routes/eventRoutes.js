const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  approveEvent,
} = require("../controllers/eventController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// ====================================
// CREATE EVENT
// Admin + Manager
// ====================================
router.post(
  "/create",
  protect,
  authorize("admin", "manager"),
  createEvent
);

// ====================================
// GET ALL EVENTS
// Admin + Manager + Viewer
// ====================================
router.get(
  "/",
  protect,
  authorize("admin", "manager", "viewer"),
  getAllEvents
);

// ====================================
// GET SINGLE EVENT
// Admin + Manager + Viewer
// ====================================
router.get(
  "/:id",
  protect,
  authorize("admin", "manager", "viewer"),
  getEventById
);

// ====================================
// UPDATE EVENT
// Admin + Manager
// ====================================
router.put(
  "/:id",
  protect,
  authorize("admin", "manager"),
  updateEvent
);

// ====================================
// DELETE EVENT
// Admin Only
// ====================================
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteEvent
);

// ====================================
// APPROVE EVENT
// Admin Only
// ====================================
router.patch(
  "/:id/approve",
  protect,
  authorize("admin"),
  approveEvent
);

module.exports = router;