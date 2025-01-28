import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './services/product.service';
import { ProductController } from './controller/product.controller';
import { Product } from './entities/product.entity';
import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  providers: [ProductService, CategoryService],
  controllers: [ProductController],
  exports: [TypeOrmModule],
})
export class ProductModule {}
