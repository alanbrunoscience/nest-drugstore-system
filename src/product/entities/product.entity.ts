import { IsInt, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NumericTransformer } from '../../util/numerictransformer';
import { Category } from '../../category/entities/category.entity';
import { Transform, TransformFnParams } from 'class-transformer';

@Entity({ name: 'tb_products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  prod_name: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Column({ length: 100, nullable: true }) // Generic name is optional.
  generic_name: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  product_type: string;

  @IsInt()
  @Min(0) // Non-negative value for stock.
  @Column({ type: 'int', nullable: false })
  stock_quantity: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Column({ type: 'text', nullable: true }) // Photo is optional.
  photo: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  price: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    eager: true, // Load the category automatically with the product.
  })
  category: Category;

  @Column({ type: 'date', nullable: true }) // Optional expiration date.
  expiration_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
