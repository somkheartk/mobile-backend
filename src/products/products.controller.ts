import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAllPaginated(
    @Query('page') page: number = 1, // ค่าเริ่มต้นคือ 1
    @Query('limit') limit: number = 10, // ค่าเริ่มต้นคือ 10
  ): Promise<{ data: Product[]; total: number; page: number; limit: number }> {
    const result = await this.productsService.findAllPaginated(page, limit);
    return {
      data: result.data,
      total: result.total,
      page: page,
      limit: limit,
    };
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product | { message: string }> {
    const product = await this.productsService.findById(id);
    if (!product) {
      return { message: 'Product not found' };
    }
    return product;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<Product | { message: string }> {
    const updatedProduct = await this.productsService.update(id, product);
    if (!updatedProduct) {
      return { message: 'Product not found' };
    }
    return updatedProduct;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const deletedProduct = await this.productsService.delete(id);
    if (!deletedProduct) {
      return { message: 'Product not found' };
    }
    return { message: 'Product deleted successfully' };
  }

  @Get('sku/:sku')
  async findBySku(@Param('sku') sku: string): Promise<Product | { message: string }> {
    const product = await this.productsService.findBySku(sku);
    if (!product) {
      return { message: 'Product not found' };
    }
    return product;
  }
}