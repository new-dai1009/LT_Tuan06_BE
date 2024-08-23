import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private configService: ConfigService,
  ) {
    const dbHost = this.configService.get<string>('DATABASE_HOST');
    console.log(`Database Host: ${dbHost}`);
  }

  getAllBooks(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  getBookById(id: number): Promise<Book> {
    return this.booksRepository.findOneBy({ id });
  }

  async addBook(newBook: Partial<Book>): Promise<Book> {
    const book = this.booksRepository.create(newBook);
    return this.booksRepository.save(book);
  }

  async updateBook(id: number, updatedBook: Partial<Book>): Promise<Book> {
    const book = await this.booksRepository.preload({
      id,
      ...updatedBook,
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return this.booksRepository.save(book);
  }

  async deleteBook(id: number): Promise<void> {
    const result = await this.booksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Book not found');
    }
  }
}
