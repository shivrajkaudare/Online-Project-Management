const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken

const { jwtToken } = require("../app");

// Register function
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
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
};

// Login function
const login = async (req, res) => {
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
    const token = jwt.sign({ id: user._id, email: user.email }, jwtToken, {
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
};

module.exports = { login, register };
