import express from "express";
import {registerUser,loginUser,logoutUser,forgotPassword,resetPassword,} from "../Controllers/authController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Register User Route
router.post("/register" ,registerUser);

// Login User Route 
router.post("/login" , loginUser);

// Logout User Route
router.post("/logout", logoutUser);

// Forgot Password Route
router.post("/forgot-password", forgotPassword);

// Reset Password Route
router.post("/reset-password/:id/:token" , resetPassword);

export default router;
