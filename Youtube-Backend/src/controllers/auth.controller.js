import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const registerUser = async (req, res) => {
  try {
    // Get data from request
    const { name, username, email, password } = req.body;

    // Check required fields
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Check if username already exists
    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Send success response
    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    // Handle server error
    res.status(500).json({
      message: error.message,
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    // Get login data
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    // Check password
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.SECURITY_KEY || "Hy Buddy!",
      {
        expiresIn: "15d",
      }
    );

    // Return user data
    res.status(200).json({
      token,
      id: user._id,
      name: user.name,
      username: user.username,
    });
  } catch (error) {
    // Handle server error
    res.status(500).json({
      message: error.message,
    });
  }
};