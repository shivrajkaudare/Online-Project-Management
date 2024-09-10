if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const jwtToken = process.env.JWT_SECRET;
module.exports = { jwtToken };

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const userRoutes = require("./routers/user.router.js"); //  user routes
const dashboardRouter = require("./routers/dashboard.router.js"); // dashboard routes
const projectRouter = require("./routers/project.routes.js"); // project routes

const app = express();
const PORT = 8080;

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // CORS- Cross Origin Resource Sharing- allow front end request to the back end.
app.use(express.json()); // Replaces bodyParser for JSON parsing
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies-parse data send by post method

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Projectman", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Database connection error:", err));

// Route Definitions
app.use("/", userRoutes);
app.use("/", dashboardRouter);
app.use("/", projectRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
