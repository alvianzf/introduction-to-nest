import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/create-book.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all books' })
  @ApiResponse({ status: 200, description: 'Return all available books.' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single book by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the book',
    example: '1',
  })
  @ApiResponse({ status: 200, description: 'Return the found book.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  create(@Body() createBooksDto: CreateBooksDto) {
    return this.booksService.create(createBooksDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing book' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the book',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  update(@Param('id') id: string, @Body() createBooksDto: CreateBooksDto) {
    return this.booksService.update(id, createBooksDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book entry' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the book',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
