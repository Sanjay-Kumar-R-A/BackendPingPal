import User from "../Model/userModel.js";


// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, status, profilePicture } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (status) user.status = status;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
