import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register new user
export const registerUser = async (req, res) => {
  try {
    // get data from request body
    const { username, email, password } = req.body;

    // check all field is filled or not
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // finding user with same email
    const userExists = await User.findOne({ email });

    // if user already there then stop register
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password before save in db
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // send success response
    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // if any error come
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
    });
  } catch (error) {
    // server side error
    res.status(500).json({
      message: error.message,
    });
  }
};
