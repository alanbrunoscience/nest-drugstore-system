import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  // Inserir nome da classe module de cada entidade (ex.: PostagemModule)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
