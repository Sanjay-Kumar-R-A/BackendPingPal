import express from "express";
import { updateUserProfile } from "../Controllers/profileController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";


const router = express.Router();


router.put("/update", authMiddleware , updateUserProfile);

export default router;
