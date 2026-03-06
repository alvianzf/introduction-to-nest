
# Module 6 - First Week Day 2

## Topics Covered

- **HTTP Methods**
- **Nest Request and Response Object**
- **Validation Pipes** 🔍
- **DTO with class-validator** ✅
- **BooksController Example** 📚

## Lecture Notes

### HTTP Methods

HTTP methods define the type of action to be performed on a resource:
- **GET**: Retrieve data from a server
- **POST**: Submit data to a server
- **PUT**: Replace an entire resource
- **PATCH**: Partially update a resource
- **DELETE**: Remove a resource

### Nest Request and Response Object

In NestJS, controllers receive `Request` and `Response` objects:

```typescript
import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';

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
}
```

### Validation Pipes

Pipes transform and validate incoming data. NestJS provides the `ValidationPipe`:

```typescript
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe());
```

### DTO with class-validator

Data Transfer Objects (DTOs) define the shape of data with validation rules:

```typescript
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
```

Use DTOs in controllers:

```typescript
@Post()
create(@Body() bodyData: CreateBooksDto) {
  books.push(bodyData);
  return {
    message: 'Book created',
    data: bodyData,
  };
}
```

## Author

**Alvian Zachry Faturrahman**

- Web: https://alvianzf.id
- LinkedIn: https://linkedin.com/in/alvianzf
- Batch: [Your batch number]

## Lecture Notes

### HTTP Methods

HTTP methods define the type of action to be performed on a resource:
- **GET**: Retrieve data from a server
- **POST**: Submit data to a server
- **PUT**: Replace an entire resource
- **PATCH**: Partially update a resource
- **DELETE**: Remove a resource

### Nest Request and Response Object

In NestJS, controllers receive `Request` and `Response` objects:

```typescript
import { Controller, Get, Req, Res } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  @Get()
  getItems(@Req() request, @Res() response) {
    response.send({ message: 'Items retrieved' });
  }
}
```

### Validation Pipes

Pipes transform and validate incoming data. NestJS provides the `ValidationPipe`:

Install required packages:
```bash
pnpm install class-validator class-transformer
```

Enable validation in main.ts:
```typescript
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe());
```

### DTO with class-validator

Data Transfer Objects (DTOs) define the shape of data with validation rules:

```typescript
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
```

Use DTOs in controllers:

```typescript
@Post()
create(@Body() createUserDto: CreateUserDto) {
  return { message: 'User created', data: createUserDto };
}
```

## Author

**Alvian Zachry Faturrahman**

- Web: https://alvianzf.id
- LinkedIn: https://linkedin.com/in/alvianzf
- Batch: [Your batch number]

