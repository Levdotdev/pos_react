import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import inventoryRoutes from "./routes/inventory.js";
import staffRoutes from "./routes/staff.js";
import applicantRoutes from "./routes/applicants.js";
import transactionRoutes from "./routes/transactions.js";
import reportRoutes from "./routes/reports.js";
import settingsRoutes from "./routes/settings.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/applicant", applicantRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/api/ping", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => console.log(`Backend running on :${PORT}`));
