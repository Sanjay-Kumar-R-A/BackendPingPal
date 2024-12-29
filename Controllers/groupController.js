import Group from "../Model/groupModel.js";


// Create a new group
export const createGroup = async (req, res) => {
  try {
    const { name, adminId, memberIds } = req.body;

    if (!name || !adminId || !memberIds) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newGroup = new Group({
      name,
      admin: adminId,
      members: [adminId, ...memberIds],
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
    const { groupId, memberId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.members.includes(memberId)) {
      group.members.push(memberId);
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
    const { groupId, memberId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    group.members = group.members.filter((id) => id.toString() !== memberId);
    await group.save();

    res.status(200).json({ message: "Member removed successfully", group });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
