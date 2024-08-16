import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.model';

@Injectable()
export class BooksService {
  private books: Book[] = [
    { id: 1, title: 'Book 1', author: 'Author 1', publishedYear: 2020 },
    { id: 2, title: 'Book 2', author: 'Author 2', publishedYear: 2021 },
  ];

  getAllBooks(): Book[] {
    return this.books;
  }

  getBookById(id: number): Book {
    const book = this.books.find(book => book.id === id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  addBook(newBook: Omit<Book, 'id'>): Book {
    const id = this.books.length + 1;
    const book = { ...newBook, id };
    this.books.push(book);
    return book;
  }

  updateBook(id: number, updatedBook: Partial<Book>): Book {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException('Book not found');
    }
    const updated = { ...this.books[bookIndex], ...updatedBook };
    this.books[bookIndex] = updated;
    return updated;
  }

  deleteBook(id: number): void {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException('Book not found');
    }
    this.books.splice(bookIndex, 1);
  }
}
