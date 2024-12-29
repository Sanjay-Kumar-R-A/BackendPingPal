import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "", // URL or path to the user's profile picture
    },
    status: {
      type: String,
      enum: ["online", "offline", "away"], // User's availability status
      default: "offline",
    },
    token: {
      type: String,
      default: null, // JWT token for authentication
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);

export default User;
