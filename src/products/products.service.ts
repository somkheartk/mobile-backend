import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async findAllPaginated(page: number, limit: number): Promise<{ data: Product[]; total: number }> {
    const skip = (page - 1) * limit; // คำนวณจำนวนข้อมูลที่ต้องข้าม
    const data = await this.productModel.find().skip(skip).limit(limit).exec();
    const total = await this.productModel.countDocuments().exec(); // นับจำนวนข้อมูลทั้งหมด
    return { data, total };
  }
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async findById(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, product: Product): Promise<Product | null> {
    return this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec();
  }

  async delete(id: string): Promise<any> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async findBySku(sku: string): Promise<Product | null> {
    return this.productModel.findOne({ sku }).exec();
  }
}