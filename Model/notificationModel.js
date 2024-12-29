import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["message", "mention", "activity"], // Notification types
      default: "message",
    },
    isRead: {
      type: Boolean,
      default: false, // Track if the notification has been read
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
