import { Document, Schema, model } from "mongoose";
import { Coupon, ICoupon, couponSchema } from "./coupon.js";

interface ICartItem extends Document {
  productId: Schema.Types.ObjectId;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface ICart extends Document {
  user: Schema.Types.ObjectId;
  cartItems: ICartItem[];
  coupons: ICoupon[];
  subtotal: number;
  tax: number;
  discount: number;
  totalPrice: number;
}

const cartItemSchema = new Schema<ICartItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new Schema<ICart>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartItems: [cartItemSchema],
  coupons: [couponSchema],
  subtotal: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

export const CartItem = model<ICartItem>("CartItem", cartItemSchema);
export const Cart = model<ICart>("Cart", cartSchema);
