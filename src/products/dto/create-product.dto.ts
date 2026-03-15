import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Laptop Pro',
    description: 'The name of the product',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 1200, description: 'The price of the product' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 'A high-end laptop for professionals',
    description: 'Product description',
    required: false,
  })
  @IsString()
  description?: string;
}

