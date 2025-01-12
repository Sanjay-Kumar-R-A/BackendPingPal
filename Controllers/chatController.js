import Group from "../Model/groupModel.js";
import User from "../Model/userModel.js";




// Get all users with their name and status
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, "name email status"); // Include only the required fields: name, email, and status

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new group
export const createGroup = async (req, res) => {
  try {
    const { name, adminEmail, memberEmails } = req.body;

    if (!name || !adminEmail || !memberEmails) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    const members = await User.find({ email: { $in: memberEmails } });
    if (members.length !== memberEmails.length) {
      return res.status(404).json({ message: "Some member users not found" });
    }

    const newGroup = new Group({
      name,
      admin: admin._id,
      members: [admin._id, ...members.map((member) => member._id)],
    });

    await newGroup.save();
    res.status(201).json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add member to group
export const addMember = async (req, res) => {
  try {
    const { groupId, memberEmail } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const member = await User.findOne({ email: memberEmail });
    if (!member) return res.status(404).json({ message: "Member user not found" });

    if (!group.members.includes(member._id)) {
      group.members.push(member._id);
      await group.save();
    }

    res.status(200).json({ message: "Member added successfully", group });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove member from group
export const removeMember = async (req, res) => {
  try {
    const { groupId, memberEmail } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const member = await User.findOne({ email: memberEmail });
    if (!member) return res.status(404).json({ message: "Member user not found" });

    group.members = group.members.filter((id) => id.toString() !== member._id.toString());
    await group.save();

    res.status(200).json({ message: "Member removed successfully", group });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, status, profilePicture } = req.body; // User ID and fields to update from the request body

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (status) user.status = status;
    if (profilePicture) user.profilePicture = profilePicture;

    // Save the updated user document
    await user.save();

    // Respond with the updated user data
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};