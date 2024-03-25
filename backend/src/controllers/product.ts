import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product.js";
import { TryCatch } from "../middlewares/error.js";

export const getAllProducts = TryCatch(async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.json(products);
});

export const getProductById = TryCatch(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const postProduct = TryCatch(async (req: Request, res: Response) => {
  const { name, description, category, price, stock, image, user } = req.body;

  const product = new Product({
    name,
    description,
    category,
    price,
    stock,
    image,
    seller: user._id,
  });
  await product.save();
  res.status(201).json({ message: "Product created successfully" });
});
