require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");
const eventRoutes = require("./routes/eventRoutes");
const activityRoutes = require("./routes/activityRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

connectDB();

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/test", testRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("EventVault API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
