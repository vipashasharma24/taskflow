const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

connectDB();

// Middleware to parse JSON
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);


const testRoutes = require("./routes/testRoutes");

app.use("/api/test", testRoutes);

// Routes
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
