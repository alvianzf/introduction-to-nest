# Junior Engineer Guide: Codebase Analysis & Best Practices

Welcome to the team! This document breaks down the advanced patterns used in this codebase. Understanding these will help you write scalable, professional-grade NestJS applications.

## 🏛️ 1. Modular Architecture
We don't put all our code in one place. Each feature (Books, Products, Users) has its own **Module**.
- **Benefit**: Encapsulation. Changes in `Products` won't accidentally break `Users`.
- **Look for**: `src/users/users.module.ts`.

## 📦 2. Consistent API Contract (`ApiResponse`)
Every request, whether successful or an error, returns the same JSON structure:
```json
{
  "status": number,
  "message": string,
  "data": T | null
}
```
- **Why?**: The frontend team only needs to write one "Response Handler". It makes the API predictable and professional.
- **Look for**: `src/types/api-response.interface.ts`.

## 🛡️ 3. Defensive Programming (DTOs & Validation)
We never trust the client. Every incoming piece of data is validated using **Data Transfer Objects (DTOs)**.
- **Tools**: `class-validator` and `ValidationPipe`.
- **Benefit**: Blocks malicious or malformed data before it even hits our database logic.
- **Look for**: `src/users/dto/create-user.dto.ts`.

## 🧱 4. Separation of Concerns (Service vs Controller)
- **Controller**: Only handles the HTTP layer (routing, status codes, Swagger docs).
- **Service**: Handles the "Business Logic" (calculating prices, searching users).
- **Why?**: If we ever want to switch from a REST API to a GraphQL API, we can reuse the **Services** without changing any business logic.

## ⚙️ 5. The Middleware Pipeline
We use a chain of decorators and middlewares to keep our controllers clean:
1.  **Helmet**: Adds security headers.
2.  **Compression**: Makes the API faster by shrinking the data size.
3.  **AuthMiddleware**: Protects sensitive routes without bloating the controller with `if (identity)` checks.
4.  **Logger**: Tracks what's happening in production for debugging.

## 🔮 6. Swagger Documentation
We don't write manual API docs. Everything is generated automatically.
- **How**: Using `@ApiProperty`, `@ApiOperation`, and `@ApiSecurity`.
- **Visit**: [http://localhost:3000/api](http://localhost:3000/api) when running the server.

## 🚀 Pro-Tips for Success
- **Stay Typed**: Avoid `any` at all costs. It defeats the purpose of TypeScript.
- **DRY (Don't Repeat Yourself)**: Use **Mapped Types** (`PartialType`, `OmitType`) to reuse your DTO definitions.
- **Global Filters**: If you need to change the error format for the whole app, edit `src/common/filters/http-exception.filter.ts`. You only have to change it once!

---
*Happy Coding!*
