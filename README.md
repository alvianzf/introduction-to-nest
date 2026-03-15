# Module 6, Second Week Day 1: Understanding DTO & Pipes in NestJS

Welcome to Day 5 of the NestJS Introduction! Today we focus on how to handle incoming data safely and efficiently using Data Transfer Objects (DTOs), Pipes, and Mapped Types.

## 📋 Table of Contents

1. [Understanding Data Transfer Objects (DTOs)](#1-understanding-data-transfer-objects-dtos)
2. [Validating Request Data with class-validator](#2-validating-request-data-with-class-validator)
3. [Enforcing Validation using ValidationPipe](#3-enforcing-validation-using-validationpipe)
4. [Transforming Incoming Data with Built-in Pipes](#4-transforming-incoming-data-with-built-in-pipes)
5. [DTO vs Entity: Separating API Contracts from Database Models](#5-dto-vs-entity-separating-api-contracts-from-database-models)
6. [Reusing DTOs with Mapped Types](#6-reusing-dtos-with-mapped-types)
7. [Best Practices for Building Scalable DTO Structures](#7-best-practices-for-building-scalable-dto-structures)
8. [Recap](#8-recap)

---

## 🌳 Project Structure

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

---

## 1. Understanding Data Transfer Objects (DTOs)

A **DTO** is an object that defines how data will be sent over the network. It serves as a contract between the client and the server.

```mermaid
graph LR
    Client["📱 Client (JSON)"]
    DTO["📄 DTO (Class)"]
    Controller["🎮 Controller"]

    Client -- "POST /products" --> DTO
    DTO --> Controller
```

## 2. Validating Request Data with class-validator

We use decorators from the `class-validator` library to define validation rules directly on our DTO properties.

```typescript
// create-product.dto.ts
import { IsString, IsNumber, MinLength, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
```

## 3. Enforcing Validation using ValidationPipe

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

## 4. Transforming Incoming Data with Built-in Pipes

Pipes can also transform data. For example, converting a string ID from a URL parameter into a number or UUID.

```typescript
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.service.findOne(id);
}
```

## 5. DTO vs Entity: Separating API Contracts from Database Models

| Feature        | DTO (Data Transfer Object)      | Entity (Database Model)         |
| -------------- | ------------------------------- | ------------------------------- |
| **Purpose**    | API Input/Output Contract       | Database Schema Mapping         |
| **Validation** | Format, Length, Presence        | Constraints, Relations, Indexes |
| **Security**   | Hides sensitive internal fields | Contains all database columns   |

## 6. Reusing DTOs with Mapped Types

NestJS provides utility types to help us keep our DTOs DRY.

- **`PartialType`**: Makes all fields optional (perfect for `PATCH`).
- **`PickType`**: Selects only specific fields.
- **`OmitType`**: Removes specific fields (e.g., hiding `password`).
- **`IntersectionType`**: Combines two DTOs.

```typescript
// update-product.dto.ts
export class UpdateProductDto extends PartialType(CreateProductDto) {}
```

## 7. Best Practices for Building Scalable DTO Structures

1. **Encapsulate DTOs**: Keep DTOs inside a `dto/` folder within their respective resource.
2. **Use Classes, not Interfaces**: Classes allow for runtime validation via decorators.
3. **Be Specific**: Create separate DTOs for Creating vs. Updating if the logic differs significantly.
4. **Document with Swagger**: Use `@ApiProperty()` to provide clear API documentation.

## 8. Recap

Today we learned how to:

- Define strict data contracts using **DTO classes**.
- Protect our endpoints using **class-validator**.
- Automatically filter and transform data with **ValidationPipe**.
- Simplify code using **Mapped Types**.

---

**Author: Alvian Zachry Faturrahman**

- Web: [alvianzf.id](https://alvianzf.id)
- LinkedIn: [alvianzf](https://linkedin.com/in/alvianzf)
