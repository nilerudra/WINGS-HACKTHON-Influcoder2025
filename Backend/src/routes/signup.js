const express = require("express");
const router = express.Router();
const User = require("../models/users");

// Route to handle user registration
router.post("/", async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
      role,
    });

    await newUser.save();

    res
      .status(201)
      .json({ status: "ok", message: "User registered successfully" });

    console.log("User Registered");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
