const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const connectDb = require("./utils/db.js");
const userRoutes = require("./routes/user.route.js");
const captainRoutes = require("./routes/captain.routes.js");
const cookieParser = require("cookie-parser");



// Middleware to handle errors
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Allow cookies to be senT
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/captains", captainRoutes);




connectDb();



module.exports = app;