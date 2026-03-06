import {
  IsString,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateBooksDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
  pages: number;

  @IsOptional()
  @IsBoolean()
  isAvailable: boolean = true;

  @IsDateString()
  publishedDate: Date;
}
