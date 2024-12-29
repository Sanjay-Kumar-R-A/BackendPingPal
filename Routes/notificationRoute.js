import express from "express";
import { sendNotification } from "../Controllers/notificationController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/notify", authMiddleware ,sendNotification);

export default router;
