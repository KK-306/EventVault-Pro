const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadImage,
} = require("../controllers/uploadController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorize,
} = require("../middleware/roleMiddleware");

// ==============================
// Upload Single Image
// Admin + Manager
// ==============================

router.post(
  "/image",
  protect,
  authorize("admin", "manager"),
  upload.single("image"),
  uploadImage
);

module.exports = router;