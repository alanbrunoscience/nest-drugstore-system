import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryService } from "./services/category.service";
import { Category } from "./entities/category.entity";
import { CategoryController } from "./controllers/category.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryService],
    controllers: [CategoryController],
    exports: [TypeOrmModule]
})
export class CategoryModule {}