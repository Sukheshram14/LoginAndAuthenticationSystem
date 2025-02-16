// Import required modules
const jwt = require("jsonwebtoken"); // JWT for token verification
const dotenv = require("dotenv"); // Load environment variables
dotenv.config(); // Initialize dotenv

// ** Middleware function to protect routes **
const blacklistedTokens = new Set();

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access Denied ❌" });
  }

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ message: "Token is blacklisted ❌" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token ❌" });
  }
};

// ** Export the middleware **
module.exports = { authenticateUser, blacklistedTokens };
