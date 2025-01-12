import express from "express";
import { sendNotification } from "../Controllers/notificationController.js";


const router = express.Router();

router.post("/notify" ,sendNotification);

export default router;
