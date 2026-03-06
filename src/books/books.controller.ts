import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Res,
} from '@nestjs/common';

type Book = {
  id: string;
  title: string;
  author: string;
  pages: number;
  isAvailable: boolean;
  publishedDate: Date;
};

const books: Book[] = [
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

@Controller('books')
export class BooksController {
  @Get()
  findAll(@Req() request: Request, @Res() response: Response) {
    console.log({ request });
    console.log({ response });

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
