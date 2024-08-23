import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll(): Promise<Book[]> {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id: number): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  @Post()
  create(@Body() body: Partial<Book>): Promise<Book> {
    return this.booksService.addBook(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<Book>): Promise<Book> {
    return this.booksService.updateBook(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.booksService.deleteBook(id);
  }
}
