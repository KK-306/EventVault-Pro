const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many authentication requests. Please try again later.",
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many login attempts. Please try again later.",
  },
});

router.post("/register", authLimiter, register);
router.post("/login", loginLimiter, login);
router.get("/me", protect, getMe);
router.post(
  "/forgot-password",
  authLimiter,
  forgotPassword
);
router.post(
  "/reset-password/:token",
  resetPassword
);

module.exports = router;
