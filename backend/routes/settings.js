import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { updateSettings } from "../controllers/settingsController.js";

const router = express.Router();

router.post("/settings", requireAuth, updateSettings);

export default router;
