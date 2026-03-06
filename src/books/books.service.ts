import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  findAll() {
    const books = this.booksRepository.findAll();
    return {
      message: 'List of all books',
      data: books,
    };
  }

  findOne(id: string) {
    const book = this.booksRepository.findOne(id);
    if (!book) {
      return {
        message: 'Book not found',
      };
    }
    return {
      message: 'Book found',
      data: book,
    };
  }

  create(createBooksDto: CreateBooksDto) {
    const book = this.booksRepository.create(createBooksDto as Book);
    return {
      message: 'Book created',
      data: book,
    };
  }

  update(id: string, updateBooksDto: Partial<Book>) {
    const book = this.booksRepository.update(id, updateBooksDto);
    if (!book) {
      return {
        message: 'Book not found',
      };
    }
    return {
      message: 'Book updated',
      data: book,
    };
  }

  remove(id: string) {
    const deleted = this.booksRepository.remove(id);
    if (!deleted) {
      return {
        message: 'Book not found',
      };
    }
    return {
      message: 'Book deleted',
    };
  }
}
