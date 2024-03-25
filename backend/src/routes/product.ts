import express from "express";
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
} from "../controllers/product.js";
import { admin, protect } from "../middlewares/auth.js";

const app = express.Router();

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
app.get("/", getAllProducts);

// @desc     Fetch a product
// @route    GET /api/products/:id
// @access   Public
app.get("/:id", getProductById);

// @desc     Create a product
// @route    POST /api/products
// @access   Private/Admin
app.post("/", protect, admin, postProduct);

// @desc     Update a product
// @route    PATCH /api/products/:id
// @access   Private/Admin
app.patch("/:id", protect, admin, updateProduct);

// @desc     Delete a product
// @route    DELETE /api/products/:id
// @access   Private/Admin
app.delete("/:id", protect, admin, deleteProduct);

export default app;
