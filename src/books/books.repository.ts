import { Injectable } from '@nestjs/common';

type Book = {
  id: string;
  title: string;
  author: string;
  pages: number;
  isAvailable: boolean;
  publishedDate: Date;
};

@Injectable()
export class BooksRepository {
  private books: Book[] = [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      pages: 180,
      isAvailable: true,
      publishedDate: new Date('1925-04-10'),
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      pages: 281,
      isAvailable: false,
      publishedDate: new Date('1960-07-11'),
    },
    {
      id: '3',
      title: '1984',
      author: 'George Orwell',
      pages: 328,
      isAvailable: true,
      publishedDate: new Date('1949-06-08'),
    },
  ];

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
