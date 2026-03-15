import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/create-book.dto';
import { ApiOperation, ApiResponse as SwaggerResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import type { ApiResponse } from '../types/api-response.interface';
import { Book } from '../types/book.type';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' }) // Updated summary
  @SwaggerResponse({ status: 200, description: 'Return all books.' }) // Updated decorator and description
  findAll(): ApiResponse<Book[]> { // Updated return type
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by id' }) // Updated summary
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the book',
    example: '1',
  })
  @SwaggerResponse({ status: 200, description: 'Return single book.' }) // Updated decorator and description
  @SwaggerResponse({ status: 404, description: 'Book not found.' }) // Updated decorator
  findOne(@Param('id') id: string): ApiResponse<Book> { // Updated return type
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new book' }) // Updated summary
  @SwaggerResponse({
    status: 201,
    description: 'Book created.', // Updated description
  })
  create(@Body() createBooksDto: CreateBooksDto): ApiResponse<Book> { // Updated return type
    return this.booksService.create(createBooksDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update book' })
  @SwaggerResponse({ status: 200, description: 'Book updated.' })
  @SwaggerResponse({ status: 404, description: 'Book not found.' })
  update(
    @Param('id') id: string,
    @Body() updateBooksDto: Partial<Book>,
  ): ApiResponse<Book> {
    return this.booksService.update(id, updateBooksDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete book' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the book',
    example: '1',
  })
  @SwaggerResponse({ status: 200, description: 'Book deleted.' })
  @SwaggerResponse({ status: 404, description: 'Book not found.' })
  remove(@Param('id') id: string): ApiResponse<null> {
    return this.booksService.remove(id);
  }
}
