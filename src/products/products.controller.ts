import { Controller,Get,Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    private readonly products = [
        {
          user: 'somkheart',
        },
        {
          user: 'kraisin',
        },
      ];
    @Get("products")
    GetUser(){
        return this.products;
    };
   
}
