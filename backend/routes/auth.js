// Import necessary modules
const express = require("express"); // Express framework for handling API requests
const bcrypt = require("bcryptjs"); // Bcrypt for password hashing
const User = require("../models/User"); // Import User model
const jwt = require("jsonwebtoken"); // Import JWT for token generation
const dotenv = require("dotenv"); // Import dotenv to access secret key
const {
  authenticateUser,
  blacklistedTokens,
} = require("../middleware/authMiddleware");

dotenv.config(); // Load environment variables

// Create an Express Router
const router = express.Router();

// ** User Registration Route **
router.post("/register", async (req, res) => {
  try {
    // Extract user details from request body
    const { username, email, password } = req.body;

    // ** Validation: Check if all fields are provided **
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required ❌" });
    }

    // Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format ❌" });
    }

    // Password strength validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long ❌" });
    }

    // ** Check if the email already exists in the database **
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered ❌" });
    }

    // ** Create a new user with the given details **
    const newUser = new User({
      username,
      email,
      password, // Password will be automatically hashed (User model handles this)
    });

    // ** Save the user in the database **
    await newUser.save();

    // ** Respond with success message (excluding password) **
    res.status(201).json({
      message: "User registered successfully ✅",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error ❌", error: error.message });
  }
});

// ** User Login Route **
router.post("/login", async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // ** Validation: Check if both fields are provided **
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required ❌" });
    }

    // ** Check if the user exists in the database **
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password ❌" });
    }

    // ** Compare the entered password with the hashed password stored in the database **
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password ❌" });
    }

    // ** Generate JWT Token for authentication **
    const token = jwt.sign(
      { userId: user._id }, // Payload (user ID)
      process.env.JWT_SECRET, // Secret key from .env file
      { expiresIn: "24h" } // Token expires in  hour
    );

    // ** Respond with user details and token (excluding password) **
    res.json({
      message: "Login successful ✅",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token, // Send token for authentication
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error ❌", error: error.message });
  }
});

// ** Logout Route **
router.post("/logout", authenticateUser, (req, res) => {
  try {
    // Get the token from the request headers
    const token = req.header("Authorization").replace("Bearer ", "");

    // Store the token in the blacklist
    blacklistedTokens.add(token);

    res.json({ message: "Logout successful ✅" });
  } catch (error) {
    res.status(500).json({ message: "Server Error ❌", error: error.message });
  }
});

// ** Protected Route: Get User Profile **
router.get("/profile", authenticateUser, async (req, res) => {
  try {
    // Find user by ID stored in req.user
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.json({ message: "User Profile Retrieved ✅", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error ❌", error: error.message });
  }
});

// ** Export the router so it can be used in server.js **
module.exports = router;
