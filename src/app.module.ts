import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_drugstore_products',
    autoLoadEntities: true,
    synchronize: true,
    logging: true
  }),
  CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
