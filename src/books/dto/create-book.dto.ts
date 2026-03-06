import {
  IsString,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBooksDto {
  @ApiProperty({
    example: 'Harry Potter',
    description: 'The title of the book',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'J.K. Rowling',
    description: 'The author of the book',
  })
  @IsString()
  author: string;

  @ApiProperty({ example: 300, description: 'Number of pages in the book' })
  @IsNumber()
  pages: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the book is currently available to borrow',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable: boolean = true;

  @ApiProperty({
    example: '1997-06-26',
    description: 'The specific date the book was published',
  })
  @IsDateString()
  publishedDate: Date;
}
