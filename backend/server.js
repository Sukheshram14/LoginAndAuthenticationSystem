// Import necessary packages
const express = require("express");  // Express framework for Node.js
const mongoose = require("mongoose"); // Mongoose for MongoDB connection
const dotenv = require("dotenv");  // dotenv to manage environment variables
const cors = require("cors");  // CORS to handle Cross-Origin Resource Sharing
const bodyParser = require("body-parser");  // Parses incoming request bodies
const authRoutes = require("./routes/auth");// Import authentication routes

// Load environment variables from the .env file
dotenv.config();

// Initialize an Express application
const app = express();




// Middleware Configuration
app.use(cors());  // Enable CORS to allow cross-origin requests (frontend can communicate with backend)
//app.use(bodyParser.json());  // Parse JSON data from incoming requests
app.use(express.static("public"));  // Serve static files (like HTML, CSS, JS from the public folder)


// Middleware to parse JSON data (Ensure this is before using routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data



// Use authentication routes in the app
app.use("/api/auth", authRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
 // useNewUrlParser: true, // Use new URL parser to avoid deprecation warnings
  //useUnifiedTopology: true, // Use new MongoDB connection management
})
.then(() => console.log("MongoDB Connected ✅"))  // If connection is successful
.catch(err => console.error("MongoDB Connection Error ❌:", err)); // If connection fails, log the error

// Define a basic route to check if the server is running
app.get("/", (req, res) => {
  res.send("User Authentication API is Running ✅");
});

// Start the Express server on the given port (from .env or default 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));


const User = require("./models/User"); // Import User model

