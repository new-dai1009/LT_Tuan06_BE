import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';  
import { Book } from './books/book.entity';
import { User } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',  
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Book,User],
      synchronize: true,  
    }),
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
