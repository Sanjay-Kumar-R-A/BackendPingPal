// chatRoute.js
import express from "express";
import {
  getAllUsers,
  createGroup,
  addMember,
  removeMember,
  updateUserProfile
} from "../Controllers/chatController.js";



const router = express.Router();

// Route to fetch all users
router.get("/users" ,getAllUsers);
router.post("/create",  createGroup);
router.put("/add-member",  addMember);
router.put("/remove-member", removeMember);
router.put("/update-profile", updateUserProfile);





export default router;
