import express from "express";
import {
  getCart,
  updateCartItem,
  applyCoupon,
  removeCoupon,
} from "../controllers/cart.js";
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

// @desc     Apply a coupon
// @route    POST /api/carts/coupon
// @access   Private
app.post("/coupon", protect, applyCoupon);

// @desc     Remove a coupon
// @route    PATCH /api/carts/coupon
// @access   Private
app.patch("/coupon", protect, removeCoupon);

export default app;
