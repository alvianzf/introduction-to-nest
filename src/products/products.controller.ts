import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse as SwaggerResponse, ApiTags } from '@nestjs/swagger';
import type { ApiResponse } from '../types/api-response.interface';
import type { Product } from '../types/product.type';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @SwaggerResponse({ status: 201, description: 'Product created.' })
  create(@Body() createProductDto: CreateProductDto): ApiResponse<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @SwaggerResponse({ status: 200, description: 'List of all products.' })
  findAll(): ApiResponse<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single product' })
  @SwaggerResponse({ status: 200, description: 'Product found.' })
  findOne(@Param('id') id: string): ApiResponse<Product> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @SwaggerResponse({ status: 200, description: 'Product updated.' })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): ApiResponse<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @SwaggerResponse({ status: 200, description: 'Product deleted.' })
  remove(@Param('id') id: string): ApiResponse<null> {
    return this.productsService.remove(id);
  }
}
