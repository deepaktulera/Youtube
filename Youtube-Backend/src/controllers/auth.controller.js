import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register new user
export const registerUser = async (req, res) => {
  try {
    // get data from request body
    const { name, username, email, password } = req.body;

    // check all field is filled or not
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check email already exists
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // check username already exists
    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// login existing user
export const loginUser = async (req, res) => {
  try {
    // get email and password
    const { email, password } = req.body;

    // check email and password is present
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    // find user by email
    const user = await User.findOne({ email });

    // if user not found
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // compare entered password with db password
    const isMatch = await bcrypt.compare(password, user.password);

    // password not match
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // create jwt token for user
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.SECURITY_KEY,
      {
        expiresIn: "15d",
      },
    );

    // send token to client
    res.status(200).json({
      token,
      id:user._id,
      name:user.name,
      username: user.username,
    });
  } catch (error) {
    // server side error
    res.status(500).json({
      message: error.message,
    });
  }
};
