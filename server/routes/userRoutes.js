const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getPendingUsers,
  approveUser,
  rejectUser,
  suspendUser,
  reactivateUser,
} = require("../controllers/userController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorize,
} = require("../middleware/roleMiddleware");

// Admin workflows (Must be before /:id)
router.get("/pending", protect, authorize("admin"), getPendingUsers);
router.patch("/:id/approve", protect, authorize("admin"), approveUser);
router.patch("/:id/reject", protect, authorize("admin"), rejectUser);
router.patch("/:id/suspend", protect, authorize("admin"), suspendUser);
router.patch("/:id/reactivate", protect, authorize("admin"), reactivateUser);

// Admin only

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllUsers
);

router.get(
  "/:id",
  protect,
  authorize("admin"),
  getUserById
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateUser
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteUser
);

module.exports = router;