import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  // Body,
} from '@nestjs/common';

@Controller('books')
export class BooksController {
  // implement books CRUD here
  @Get()
  findAll() {
    return 'All books';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Book with id ${id}`;
  }

  @Post()
  create() {
    return 'Book created';
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `Book with id ${id} updated`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Book with id ${id} deleted`;
  }
}
