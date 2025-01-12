import express from "express";
import {registerUser,loginUser,forgotPassword,resetPassword} from "../Controllers/authController.js";



const router = express.Router();

// Register User Route
router.post("/register",registerUser);

// Login User Route 
router.post("/login" , loginUser);


// Forgot Password Route
router.post("/forgot-password", forgotPassword);

// Reset Password Route
router.post("/reset-password/:id/:token" , resetPassword);



export default router;
