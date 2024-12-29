import Notification from "../Model/notificationModel.js";
import cloudinary from "../Config/Cloudinary.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Send notification
export const sendNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;

    const newNotification = new Notification({
      user: userId,
      message,
      type,
    });

    await newNotification.save();
    res.status(201).json({ message: "Notification sent", notification: newNotification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
