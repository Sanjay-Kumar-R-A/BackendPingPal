import User from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body; // Including status
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      status: status || "offline", // Default status to offline
    });
    await newUser.save();
    res.status(200).json({
      message: "User Registered Successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;
    user.status = "online"; // Set status to online upon login
    await user.save();
    res.status(200).json({
      message: "User Logged In Successfully",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    user.status = "offline"; // Set status to offline upon logout
    user.token = null; // Clear token
    await user.save();
    res.status(200).json({ message: "User Logged Out Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.PASS_MAIL,
        pass: process.env.PASS_KEY,
      },
    });
    const mailOptions = {
      from: process.env.PASS_MAIL,
      to: user.email,
      subject: "Password Reset Link",
      text: `Please click the link to reset your password: http://localhost:5173/forgot-password/${user._id}/${token}`,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Error sending email" });
      } else {
        res.status(200).json({ message: "Email Sent Successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(id, { password: hashPassword });
      res.status(200).json({ message: "Password Reset Successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};
