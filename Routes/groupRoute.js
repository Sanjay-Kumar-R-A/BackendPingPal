import express from "express";
import { createGroup, addMember, removeMember } from "../Controllers/groupController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware , createGroup);
router.put("/add-member", authMiddleware , addMember);
router.put("/remove-member", authMiddleware , removeMember);

export default router;
