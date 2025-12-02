import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { updateStock, importCsv } from "../controllers/inventoryController.js";
import multer from "multer";
const upload = multer({ dest: "uploads/csvs/" });

const router = express.Router();

router.post("/update-stock", requireAuth, updateStock);
router.post("/update-csv", requireAuth, upload.single("csv_file"), importCsv);

export default router;
