import { Book } from '../../types/book.type';

export const booksMock: Book[] = [
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
