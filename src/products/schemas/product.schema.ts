import { Schema, Document } from 'mongoose';

export const ProductSchema = new Schema({
  product_name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  stock_quantity: { type: Number, required: true },
  sku: { type: String, required: true, unique: true },
});

export interface Product extends Document {
  product_name: string;
  price: number;
  category: string;
  description: string;
  stock_quantity: number;
  sku: string;
}