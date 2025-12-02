import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { createTransaction, listTransactions, getReceiptImage } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/create", requireAuth, createTransaction);
router.get("/", requireAuth, listTransactions);
router.get("/receipt/:file", requireAuth, getReceiptImage);

export default router;
