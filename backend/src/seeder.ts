import { coupons } from "./data/coupons.js";
import { products } from "./data/products.js";
import { users } from "./data/users.js";
import { Cart, CartItem } from "./models/cart.js";
import { Coupon } from "./models/coupon.js";
import { Product } from "./models/product.js";
import { User } from "./models/user.js";
import { connectDB } from "./utils/features.js";
import { config } from "dotenv";

config({
  path: "./.env",
});

const mongoURI = process.env.MONGODB_URL || "";
connectDB(mongoURI);

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await CartItem.deleteMany();
    await Cart.deleteMany();
    await Coupon.deleteMany();

    const createdUsers = await User.insertMany(users);
    const admin = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        seller: admin,
      };
    });
    await Product.insertMany(sampleProducts);
    await Coupon.insertMany(coupons);
    console.log("Data imported");
    process.exit();
  } catch (err) {
    console.error("Error with data import", err);
    process.exit(1);
  }
};

importData();
