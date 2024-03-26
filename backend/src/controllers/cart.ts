import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { Cart, CartItem } from "../models/cart.js";
import { Product } from "../models/product.js";
import { Coupon, ICoupon } from "../models/coupon.js";

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

const calculateDiscount = async (coupons: ICoupon[], subtotal: number) => {
  let totalDiscount = 0;
  for (const coupon of coupons) {
    if (coupon.discountType === "percentage") {
      const discountAmount = subtotal * (coupon.discountValue / 100);
      totalDiscount += discountAmount;
    } else if (coupon.discountType === "fixed") {
      totalDiscount += coupon.discountValue;
    }
  }
  return totalDiscount;
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

export const applyCoupon = TryCatch(async (req: Request, res: Response) => {
  const { user, couponCode } = req.body;
  if (!user) {
    throw new Error("User ID not found");
  }

  const cart = await Cart.findOne({ user: user._id });
  if (!cart || cart.subtotal === 0) {
    throw new Error("Add items to the cart before applying a coupon");
  }

  const coupon = await Coupon.findOne({ code: couponCode });
  if (!coupon) {
    throw new Error("Invalid coupon code");
  }

  const couponExists = cart.coupons.some(
    (appliedCoupon) => appliedCoupon.code === couponCode
  );
  if (couponExists) {
    throw new Error("Coupon already been applied");
  }

  cart.coupons.push(coupon);

  const discount = await calculateDiscount(cart.coupons, cart.subtotal);
  cart.discount = discount;

  cart.totalPrice = Math.max(0, cart.subtotal + cart.tax - cart.discount);

  await cart.save();
  res.status(200).json({ message: "Coupon applied successfully", cart: cart });
});

export const removeCoupon = TryCatch(async (req: Request, res: Response) => {
  const { user, couponCode } = req.body;
  if (!user) {
    throw new Error("User ID not found");
  }

  const cart = await Cart.findOne({ user: user._id }).populate("coupons");
  if (!cart) {
    throw new Error("Cart not found");
  }

  const couponToRemove = await Coupon.findOne({ code: couponCode });
  if (!couponToRemove) {
    throw new Error("Coupon not found");
  }

  const couponExistsInCart = cart.coupons.some(
    (coupon) => coupon.code === couponCode
  );
  if (!couponExistsInCart) {
    throw new Error("Coupon never applied");
  }

  cart.coupons = cart.coupons.filter((coupon) => coupon.code !== couponCode);

  const discount = await calculateDiscount(cart.coupons, cart.subtotal);
  cart.discount = discount;

  cart.totalPrice = cart.subtotal + cart.tax - cart.discount;
  await cart.save();

  res.status(200).json({ message: "Coupon removed successfully", cart: cart });
});
