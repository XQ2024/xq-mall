import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { Cart, CartItem } from "../models/cart.js";
import { Product } from "../models/product.js";

const TAX_RATE = 0.08;
const initializeCart = async (user: { _id: any }) => {
  let cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    cart = new Cart({
      user: user._id,
      cartItems: [],
      subtotal: 0,
      tax: 0,
      discount: 0,
      totalPrice: 0,
    });
    await cart.save();
  }
  return cart;
};

export const getCart = TryCatch(async (req: Request, res: Response) => {
  const { user } = req.body;
  if (!user) {
    throw new Error("User ID not found");
  }
  const cart = await initializeCart(user);
  res.status(200).json(cart);
});

export const updateCartItem = TryCatch(async (req: Request, res: Response) => {
  const { user, productId, quantity } = req.body;
  if (!user) {
    throw new Error("User ID not found");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  let cart = await initializeCart(user);

  const itemIndex = cart.cartItems.findIndex(
    (item) => item.productId.toString() === productId.toString()
  );

  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.cartItems.splice(itemIndex, 1);
    } else {
      cart.cartItems[itemIndex].quantity = quantity;
    }
  } else if (quantity > 0) {
    cart.cartItems.push(
      new CartItem({
        productId: product._id,
        name: product.name,
        image: product.image,
        quantity: quantity,
        price: product.price,
      })
    );
  }
  cart.subtotal = cart.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  cart.tax = cart.subtotal * TAX_RATE;
  cart.totalPrice = cart.subtotal + cart.tax - cart.discount;
  await cart.save();
  res.status(200).json(cart);
});
