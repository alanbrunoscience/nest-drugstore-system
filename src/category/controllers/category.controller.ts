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
import { Category } from '../entities/category.entity';
import { CategoryService } from '../services/category.service';

@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  findByName(@Param('name') name: string): Promise<Category[]> {
    return this.categoryService.findByName(name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  post(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  put(@Body() category: Category): Promise<Category> {
    return this.categoryService.update(category);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
