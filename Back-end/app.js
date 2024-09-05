// server.js (or your main server file)
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userSchema"); // Adjust according to your project structure
const Register = require("./models/Register");
const Project = require("./models/newProjectSchema");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8080;

app.use(cors({ origin: "http://localhost:5173" }));

app.use(bodyParser.json()); // To parse JSON bodies

//middle for parse the data send by post method
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/Projectman", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Database connection error:", err));

// Route for User Registration
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    //  this Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Send response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    // Ensure only one response is sent
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: "An error occurred while registering the user" });
    }
  }
});

// JWT Secret key ....should be more secure or hard coded .
const JWT_SECRET =
  "1a2b3c4d5e6f7g8h9i0jklmnopqrstuvwx1234567890abcdef1234567890abcdef";

// Route for User Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token and success message
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in user:", err);
    res
      .status(500)
      .json({ message: "An error occurred while logging in the user" });
  }
});

// Route to fetch dashboard stats
app.get("/dashboard/stats", async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const closedProjects = await Project.countDocuments({ status: "Closed" });
    const runningProjects = await Project.countDocuments({ status: "Running" });
    const closureDelayProjects = await Project.countDocuments({
      status: "Closure Delay",
    });
    const cancelledProjects = await Project.countDocuments({
      status: "Cancelled",
    });

    res.json({
      totalProjects,
      closedProjects,
      runningProjects,
      closureDelayProjects,
      cancelledProjects,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
});

//  route to fetch total and closed projects by department - For chart on dashbord.
app.get("/projects/department-summary", async (req, res) => {
  try {
    const departments = ["STR", "FIN", "QLT", "MAN", "STO", "HR"];

    const projectSummary = await Promise.all(
      departments.map(async (department) => {
        const totalProjects = await Project.countDocuments({ department });
        const closedProjects = await Project.countDocuments({
          department,
          status: "Closed",
        });

        return {
          department,
          totalProjects,
          closedProjects,
        };
      })
    );

    res.json(projectSummary);
  } catch (error) {
    res.status(500).send("Error fetching project summary");
  }
});

// Route to save a project
app.post("/addproject", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ message: "Project saved successfully!" });
  } catch (error) {
    console.error("Error saving project:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the project." });
  }
});

// Get all projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving projects", error });
  }
});
app.get("/projects", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const projects = await Project.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalProjects = await Project.countDocuments();
    res.json({
      projects,
      totalPages: Math.ceil(totalProjects / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

// Update project status
app.put("/project/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error updating project status", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
