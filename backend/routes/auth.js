import express from "express";
import { register, login, me } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.post("/auth/password-reset", authController.passwordResetRequest);
router.post("/auth/new-password", authController.setNewPassword);
router.get("/auth/verify-email", authController.verifyEmail);

export default router;
