// Import mongoose to define the schema and model
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing

// Define the User Schema (structure of user data in the database)
const userSchema = new mongoose.Schema({
  username: {
    type: String, // Data type is String
    required: true, // This field is mandatory
    unique: true, // Username must be unique
    trim: true, // Removes unnecessary spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email must be unique
    trim: true,
    lowercase: true, // Convert email to lowercase before storing
  },
  password: {
    type: String,
    required: true, // Password is required
    minlength: 6, // Minimum password length
  },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

// ** Pre-save Hook for Password Hashing **
// Before saving a user, this function runs automatically
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // If password is not changed, move to next step

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password using bcrypt
    next(); // Continue saving user
  } catch (error) {
    next(error); // Handle any error
  }
});

// ** Create a User Model **
const User = mongoose.model("User", userSchema); // Create a Mongoose model with the schema

// ** Export the User Model for use in other files **
module.exports = User;
