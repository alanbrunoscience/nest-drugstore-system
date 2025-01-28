import { ProductService } from '../services/product.service';
import { Product } from './../entities/product.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Get('/product-name/:prod_name')
  @HttpCode(HttpStatus.OK)
  findByProdName(@Param('prod_name') prod_name: string): Promise<Product[]> {
    return this.productService.findByProdName(prod_name);
  }

  @Get('/generic-name/:generic_name')
  @HttpCode(HttpStatus.OK)
  findByGenericName(
    @Param('generic_name') generic_name: string,
  ): Promise<Product[]> {
    return this.productService.findByGenericName(generic_name);
  }

  @Get('/product-type/:product_type')
  @HttpCode(HttpStatus.OK)
  findByProdType(
    @Param('product_type') product_type: string,
  ): Promise<Product[]> {
    return this.productService.findByProdType(product_type);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() product: Product): Promise<Product> {
    return this.productService.update(product);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
