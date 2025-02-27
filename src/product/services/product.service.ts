import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { CategoryService } from '../../category/services/category.service';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: {
        category: true,
      },
    });
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
      },
    });

    if (!product)
      throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);

    return product;
  }

  async findByProdName(prod_name: string): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        prod_name: ILike(`%${prod_name}%`),
      },
      relations: {
        category: true,
      },
    });

    if (products.length === 0) {
      throw new HttpException('Product name not found!', HttpStatus.NOT_FOUND);
    }

    return products;
  }

  async findByGenericName(generic_name: string): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        generic_name: ILike(`%${generic_name}%`),
      },
      relations: {
        category: true,
      },
    });

    if (products.length === 0) {
      throw new HttpException('Generic product name not found!', HttpStatus.NOT_FOUND);
    }

    return products;
  }

  async findByProdType(product_type: string): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        product_type: ILike(`%${product_type}%`),
      },
      relations: {
        category: true,
      },
    });

    if (products.length === 0) {
      throw new HttpException('Product type not found!', HttpStatus.NOT_FOUND);
    }

    return products;
  }

  async create(product: Product): Promise<Product> {
    await this.categoryService.findById(product.category.id);

    return await this.productRepository.save(product);
  }

  async update(product: Product): Promise<Product> {
    await this.findById(product.id);

    await this.categoryService.findById(product.category.id);

    return await this.productRepository.save(product);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.productRepository.delete(id);
  }
}
