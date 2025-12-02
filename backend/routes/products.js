import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { addProduct, updateProduct, softDeleteProduct, listProducts, getProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/add", requireAuth, addProduct);
router.post("/update", requireAuth, updateProduct);
router.post("/delete/:id", requireAuth, softDeleteProduct);

router.get("/", requireAuth, listProducts);
router.get("/:id", requireAuth, getProduct);

export default router;
