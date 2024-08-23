import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forFeature([Book]), ConfigModule.forRoot()],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {}
