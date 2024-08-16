import { Controller, Get, Param, Post, Body, Put, Patch, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.model';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks(): Book[] {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id: string): Book {
    return this.booksService.getBookById(parseInt(id));
  }

  @Post()
  addBook(@Body() newBook: Omit<Book, 'id'>): Book {
    return this.booksService.addBook(newBook);
  }

  @Put(':id')
  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() updatedBook: Partial<Book>): Book {
    return this.booksService.updateBook(parseInt(id), updatedBook);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string): void {
    this.booksService.deleteBook(parseInt(id));
  }
}
