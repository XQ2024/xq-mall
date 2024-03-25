import express from "express";
import {
  getAllProducts,
  getProductById,
  postProduct,
} from "../controllers/product.js";
import { admin, protect } from "../middlewares/auth.js";

const app = express.Router();

// @desc     Fetch all products
// @route    POST /api/product
// @access   Public
app.get("/", getAllProducts);

// @desc     Fetch a product
// @route    POST /api/product/:id
// @access   Public
app.get("/:id", getProductById);

// @desc     Create a product
// @route    POST /api/product
// @access   Private/Admin
app.post("/", protect, admin, postProduct);

export default app;
