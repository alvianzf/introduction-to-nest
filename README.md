# Module 6, Second Week Day 1: Understanding DTO & Pipes in NestJS

Welcome to Day 5 of the NestJS Introduction! Today we focus on how to handle incoming data safely and efficiently using Data Transfer Objects (DTOs), Pipes, and Mapped Types.

## 📌 Topics covered in this module
- Understanding Data Transfer Objects (DTOs) in NestJS
- Validating request data with `class-validator`
- Enforcing validation using `ValidationPipe`
- Transforming incoming data with built-in pipes
- DTO vs Entity: separating API contracts from database models
- Reusing DTOs with mapped types (`PartialType`, `PickType`, `IntersectionType`)
- Best practices for building scalable DTO structures
- Recap

## 🏗 Project Structure

```text
📁 src
├── 📄 main.ts                <-- Global pipe configuration
├── 📁 data                   <-- Centralized mock data
├── 📁 products               <-- Product Resource
│   ├── 📁 dto                <-- Encapsulated Product DTOs
│   │   ├── 📄 create-product.dto.ts
│   │   └── 📄 update-product.dto.ts
│   ├── 📄 products.controller.ts
│   ├── 📄 products.service.ts
│   └── 📄 products.repository.ts
├── 📁 users                  <-- User Resource
│   ├── 📁 dto                <-- Encapsulated User DTOs
│   │   ├── 📄 create-user.dto.ts
│   │   └── 📄 update-user.dto.ts
│   └── ...
└── 📁 types                  <-- Shared TypeScript Interfaces
```

## 🚀 Learning Goals
- Learn how to define clear and secure data contracts using DTOs.
- Master request validation using `class-validator` and `ValidationPipe`.
- Understand the importance of data transformation in a backend application.
- Explore NestJS mapped types to avoid code duplication in DTOs.

## 📜 Tutorial: Understanding DTO & Pipes

### 1. Understanding Data Transfer Objects (DTOs)
A **DTO** is an object that defines how data will be sent over the network. It serves as a strict contract between the client and the server.

```mermaid
graph LR
    Client["📱 Client (JSON)"]
    DTO["📄 DTO (Class)"]
    Controller["🎮 Controller"]

    Client -- "POST /products" --> DTO
    DTO --> Controller
```

### 2. Validating Request Data with class-validator
We use decorators from the `class-validator` library to define validation rules directly on our DTO properties.

```typescript
// create-product.dto.ts
import { IsString, IsNumber, MinLength, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Modern Laptop' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 1200 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
```

### 3. Enforcing Validation using ValidationPipe
To make the decorators work, we must tell NestJS to use the `ValidationPipe` globally in `main.ts`.

```typescript
// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // Strips properties not in the DTO
    forbidNonWhitelisted: true, // Throws error if extra properties are sent
    transform: true, // Auto-transforms payloads to DTO instances
  }),
);
```

### 4. Transforming Incoming Data with Built-in Pipes
Pipes can also transform data. For example, converting a string ID from a URL parameter into a number or UUID.

```typescript
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  // id is automatically converted from string to number
  return this.service.findOne(id);
}
```

### 5. DTO vs Entity
| Feature        | DTO (Data Transfer Object)      | Entity (Database Model)         |
| -------------- | ------------------------------- | ------------------------------- |
| **Purpose**    | API Input/Output Contract       | Database Schema Mapping         |
| **Validation** | Format, Length, Presence        | Constraints, Relations, Indexes |
| **Security**   | Hides sensitive internal fields | Contains all database columns   |

### 6. Reusing DTOs with Mapped Types (Detailed Examples)

NestJS provides utility types to keep your DTOs DRY:

#### PartialType
Creates a type with all properties of the base class set to optional.
```typescript
// Inherits name, price, description but makes them all optional
export class UpdateProductDto extends PartialType(CreateProductDto) {}
```

#### PickType
Creates a type by picking a set of properties from an existing class.
```typescript
// Only includes the 'name' property
export class UpdateProductNameDto extends PickType(CreateProductDto, ['name']) {}
```

#### OmitType
Creates a type by picking all properties from an existing class and then removing a particular set of keys.
```typescript
// Includes everything EXCEPT 'password'
export class SafeUserDto extends OmitType(CreateUserDto, ['password']) {}
```

#### IntersectionType
Combines two types into one.
```typescript
// Combines basic info with additional metadata
export class DetailedUserDto extends IntersectionType(CreateUserDto, AdditionalInfoDTO) {}
```

---

## 🛠 Syntax & Function Reference

### Validation Decorators (`class-validator`)
| Syntax | What is it? | Function |
| :--- | :--- | :--- |
| **`@IsString()`** | Decorator | Ensures the value is a valid string. |
| **`@IsNumber()`** | Decorator | Ensures the value is a number (integer or float). |
| **`@MinLength(n)`** | Decorator | Ensures string length is at least **n** characters. |
| **`@IsPositive()`** | Decorator | Ensures the number is greater than zero. |
| **`@IsOptional()`** | Decorator | Skips validation if the property is missing or null. |
| **`@IsEmail()`** | Decorator | Ensures the string is a valid email format. |

### Global Configuration (`main.ts`)
| Syntax | What is it? | Function |
| :--- | :--- | :--- |
| **`whitelist: true`** | Pipe Option | Automatically removes any property NOT defined in the DTO class. |
| **`forbidNonWhitelisted`** | Pipe Option | Throws an error (400 Bad Request) if unknown properties are detected. |
| **`transform: true`** | Pipe Option | Converts the plain JavaScript object into an instance of the DTO class. |

### NestJS Mapped Types
| Syntax | What is it? | Function |
| :--- | :--- | :--- |
| **`PartialType(T)`** | Utility Class | Returns a class with all properties from **T** marked as optional. |
| **`PickType(T, [K])`** | Utility Class | Returns a class with only the specified keys **K** from **T**. |
| **`OmitType(T, [K])`** | Utility Class | Returns a class with all properties from **T** except the keys **K**. |
| **`IntersectionType(A, B)`**| Utility Class | Returns a class that merges all properties from both **A** and **B**. |

### Built-in Pipes
| Syntax | What is it? | Function |
| :--- | :--- | :--- |
| **`ParseIntPipe`** | Pipe class | Converts a string parameter into an integer; throws error if not a number. |
| **`ValidationPipe`** | Global Pipe | Orchestrates the validation process using `class-validator` on incoming DTOs. |

---

## ✍️ Author
**Alvian Zachry Faturrahman**
- Web: [alvianzf.id](https://alvianzf.id)
- LinkedIn: [alvianzf](https://linkedin.com/in/alvianzf)
