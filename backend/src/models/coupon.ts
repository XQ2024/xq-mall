import { Document, Schema, model } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discountType: string;
  discountValue: number;
}

export const couponSchema = new Schema<ICoupon>({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountType: {
    type: String,
    required: true,
    enum: ["fixed", "percentage"],
  },
  discountValue: {
    type: Number,
    required: true,
  },
});

export const Coupon = model<ICoupon>("Coupon", couponSchema);
