import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from '../types/book.type';
import { CreateBooksDto } from './dto/create-book.dto';
import { ApiResponse } from '../types/api-response.interface';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  findAll(): ApiResponse<Book[]> {
    const books = this.booksRepository.findAll();
    return {
      status: 200,
      message: 'List of all books',
      data: books,
    };
  }

  findOne(id: string): ApiResponse<Book> {
    const book = this.booksRepository.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return {
      status: 200,
      message: 'Book found',
      data: book,
    };
  }

  create(createBooksDto: CreateBooksDto): ApiResponse<Book> {
    const book = this.booksRepository.create({
      id: (this.booksRepository.findAll().length + 1).toString(),
      ...createBooksDto,
    } as Book);
    return {
      status: 201,
      message: 'Book created',
      data: book,
    };
  }

  update(id: string, updateBooksDto: Partial<Book>): ApiResponse<Book> {
    const book = this.booksRepository.update(id, updateBooksDto);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return {
      status: 200,
      message: 'Book updated',
      data: book,
    };
  }

  remove(id: string): ApiResponse<null> {
    const deleted = this.booksRepository.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return {
      status: 200,
      message: 'Book deleted',
    };
  }
}
