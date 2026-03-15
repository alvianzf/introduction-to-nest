import { Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { Product } from '../types/product.type';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}

  create(createProductDto: CreateProductDto) {
    const newProduct: Product = {
      id: (this.productRepository.findAll().length + 1).toString(),
      ...createProductDto,
    };
    const product = this.productRepository.create(newProduct);
    return {
      message: 'Product created',
      data: product,
    };
  }

  findAll() {
    const products = this.productRepository.findAll();
    return {
      message: 'List of all products',
      data: products,
    };
  }

  findOne(id: string) {
    const product = this.productRepository.findOne(id);
    if (!product) {
      return {
        message: 'Product not found',
      };
    }
    return {
      message: 'Product found',
      data: product,
    };
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const product = this.productRepository.update(id, updateProductDto);
    if (!product) {
      return {
        message: 'Product not found',
      };
    }
    return {
      message: 'Product updated',
      data: product,
    };
  }

  remove(id: string) {
    const deleted = this.productRepository.remove(id);
    if (!deleted) {
      return {
        message: 'Product not found',
      };
    }
    return {
      message: 'Product deleted',
    };
  }
}

