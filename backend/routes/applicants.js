import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { rejectApplicant, verifyApplicant } from "../controllers/applicantController.js";

const router = express.Router();

router.post("/reject/:id", requireAuth, rejectApplicant);
router.post("/verify/:id", requireAuth, verifyApplicant);

export default router;
