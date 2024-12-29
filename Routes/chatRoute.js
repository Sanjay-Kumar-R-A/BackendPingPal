// chatRoute.js
import express from "express";
import {
  createChat,
  sendMessage,
  getChatById,
  getChatsForUser,
  deleteChat,
} from "../Controllers/chatController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Route to create a new chat
router.post("/create" , authMiddleware ,createChat);

// Route to send a message
router.post("/send", authMiddleware ,sendMessage);

// Route to get a specific chat by ID
router.get("/:chatId", authMiddleware ,getChatById);

// Route to get all chats for a specific user
router.get("/user/:userId", authMiddleware ,getChatsForUser);

// Route to delete a chat
router.delete("/:chatId", authMiddleware , deleteChat);



export default router;
