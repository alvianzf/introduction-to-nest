import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { Product } from '../types/product.type';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse } from '../types/api-response.interface';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}

  create(createProductDto: CreateProductDto): ApiResponse<Product> {
    const newProduct: Product = {
      id: (this.productRepository.findAll().length + 1).toString(),
      ...createProductDto,
    };
    const product = this.productRepository.create(newProduct);
    return {
      status: 201,
      message: 'Product created',
      data: product,
    };
  }

  findAll(): ApiResponse<Product[]> {
    const products = this.productRepository.findAll();
    return {
      status: 200,
      message: 'List of all products',
      data: products,
    };
  }

  findOne(id: string): ApiResponse<Product> {
    const product = this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {
      status: 200,
      message: 'Product found',
      data: product,
    };
  }

  update(id: string, updateProductDto: UpdateProductDto): ApiResponse<Product> {
    const product = this.productRepository.update(id, updateProductDto);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {
      status: 200,
      message: 'Product updated',
      data: product,
    };
  }

  remove(id: string): ApiResponse<null> {
    const deleted = this.productRepository.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {
      status: 200,
      message: 'Product deleted',
    };
  }
}

