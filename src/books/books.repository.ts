import { Injectable } from '@nestjs/common';
import { Book } from '../types/book.type';
import { booksMock } from './data/books.mock';

@Injectable()
export class BooksRepository {
  private books: Book[] = booksMock;

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: string): Book | undefined {
    return this.books.find((b) => b.id === id);
  }

  create(book: Book): Book {
    this.books.push(book);
    return book;
  }

  update(id: string, updates: Partial<Book>): Book | undefined {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) return undefined;
    this.books[index] = { ...this.books[index], ...updates };
    return this.books[index];
  }

  remove(id: string): boolean {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) return false;
    this.books.splice(index, 1);
    return true;
  }
}
