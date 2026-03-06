import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

type Book = {
  id: string;
  title: string;
  author: string;
};

const books: Book[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

@Controller('books')
export class BooksController {
  @Get()
  findAll() {
    return {
      message: 'List of all books',
      data: books,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const book = books.find((b) => b.id === id);
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

  @Post()
  create(@Body() bodyData: Book) {
    books.push(bodyData);
    return {
      message: 'Book created',
      data: bodyData,
    };
  }

  @Put(':id')
  update(@Param('id') id: string) {
    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      return {
        message: 'Book not found',
      };
    }
    return {
      message: 'Book updated',
      data: books[bookIndex],
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      return {
        message: 'Book not found',
      };
    }
    books.splice(bookIndex, 1);
    return {
      message: 'Book deleted',
    };
  }
}
