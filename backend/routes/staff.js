import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { deactivateStaff } from "../controllers/staffController.js";

const router = express.Router();

router.post("/deactivate/:id", requireAuth, deactivateStaff);

export default router;
