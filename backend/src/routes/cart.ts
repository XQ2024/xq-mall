import express from "express";
import { getCart, updateCartItem } from "../controllers/cart.js";
import { protect } from "../middlewares/auth.js";

const app = express.Router();

// @desc     Get my cart
// @route    GET /api/carts
// @access   Private
app.get("/", protect, getCart);

// @desc     Update cart item quantity
// @route    PATCH /api/carts
// @access   Private
app.patch("/", protect, updateCartItem);

export default app;
