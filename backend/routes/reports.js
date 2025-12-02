import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { monthlyReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/report", requireAuth, monthlyReport);
router.post("/report", requireAuth, monthlyReport);

export default router;
