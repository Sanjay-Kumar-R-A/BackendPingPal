import Chat from "../Model/chatModel.js";

import cloudinary from "../Config/Cloudinary.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a new chat
export const createChat = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newChat = new Chat({
      participants: [senderId, receiverId],
      messages: [
        {
          sender: senderId,
          content: message,
          timestamp: new Date(),
        },
      ],
    });

    await newChat.save();

    res.status(201).json({ message: "Chat created successfully", chat: newChat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send a message in a chat
export const sendMessage = async (req, res) => {
  try {
    const { chatId, senderId, message } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.messages.push({
      sender: senderId,
      content: message,
      timestamp: new Date(),
    });

    await chat.save();

    res.status(200).json({ message: "Message sent successfully", chat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get chat by ID
export const getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId).populate("participants", "name email status");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ chat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all chats for a user
export const getChatsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const chats = await Chat.find({ participants: userId }).populate(
      "participants",
      "name email status"
    );

    res.status(200).json({ chats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a chat
export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findByIdAndDelete(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// User Controller (e.g., userController.js)
export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


