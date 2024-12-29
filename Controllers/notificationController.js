import Notification from "../Model/notificationModel.js";


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
