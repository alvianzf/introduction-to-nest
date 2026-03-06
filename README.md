
# Module 6 - First Week Day 1

## Topics Covered

- **What is Backend Development** 🖥️
- **NestJS Basics** 🏗️
- **REST Basics** 🔗

## Lecture Notes

### What is Backend Development

The backend has three main parts:

- **Server**: The place where requests land, like your PC when you run a local gym battle.
- **Application**: The actual logic that decides what to do — your Pokémon trainer making battle decisions.
- **Database**: Where all the data lives — think of it as your Pokémon storage box, holding all your stats, moves, and items safely.

### NestJS Basics

#### Installation

Install NestJS globally:

```bash
npm install -g @nestjs/cli
```

#### Create a New Project

```bash
nest new project-name
cd project-name
```

#### Project Structure

```
src/
├── main.ts                  # Application entry point
├── app.module.ts            # Root module
├── app.controller.ts        # Basic controller
├── app.service.ts           # Basic service
├── books/
│   ├── books.controller.ts  # Books REST endpoints
│   ├── books.service.ts     # Books business logic
│   └── books.module.ts      # Books module
└── nest-cli.json            # NestJS CLI configuration
```

**Key Files:**
- `main.ts`: Bootstraps the NestJS application
- `app.module.ts`: Root module that imports all other modules
- `app.controller.ts`: Handles incoming requests and returns responses
- `app.service.ts`: Contains business logic
- `books.controller.ts`: Handles book-related HTTP requests
- `books.service.ts`: Contains book operations logic
- `nest-cli.json`: NestJS CLI configuration
- `tsconfig.json`: TypeScript configuration

### REST Basics

#### What is an API?

An **API** (Application Programming Interface) is a set of protocols and tools that allows different software applications to communicate with each other. It defines the requests you can make and the responses you'll receive.

#### How REST Works

REST (Representational State Transfer) is an architectural style for building APIs using standard HTTP methods to perform operations on resources.

```
┌─────────────┐                                    ┌─────────────┐
│   Client    │ ──── HTTP Request (GET, POST...) ──▶ │   Server    │
│             │                                     │             │
│             │ ◀── HTTP Response (JSON, Data) ──── │             │
└─────────────┘                                    └─────────────┘
```

#### HTTP Methods

REST uses standard HTTP methods to define operations:

| Method | Purpose | Example |
|--------|---------|---------|
| **GET** | Retrieve data | `GET /books` - fetch all books |
| **POST** | Create new resource | `POST /books` - add a new book |
| **PUT** | Update existing resource | `PUT /books/1` - modify book with ID 1 |
| **DELETE** | Remove resource | `DELETE /books/1` - delete book with ID 1 |

#### Sample Code: Books API

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

type Book = {
  id: string;
  title: string;
  author: string;
};

const books: Book[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

@Controller('books')
export class BooksController {
  @Get()
  findAll() {
    return {
      message: 'List of all books',
      data: books,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const book = books.find((b) => b.id === id);
    if (!book) {
      return { message: 'Book not found' };
    }
    return { message: 'Book found', data: book };
  }

  @Post()
  create(@Body() bodyData: Book) {
    books.push(bodyData);
    return { message: 'Book created', data: bodyData };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() bodyData: Book) {
    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      return { message: 'Book not found' };
    }
    books[bookIndex] = { ...books[bookIndex], ...bodyData };
    return { message: 'Book updated', data: books[bookIndex] };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      return { message: 'Book not found' };
    }
    books.splice(bookIndex, 1);
    return { message: 'Book deleted' };
  }
}
```

#### Code Glossary

| Term | Definition | Usage |
|------|-----------|-------|
| `@Controller('books')` | Decorator defining the base route for all endpoints in this class | Routes all requests to `/books` |
| `@Get()` | Decorator mapping HTTP GET requests | Retrieves data without modifying it |
| `@Get(':id')` | Decorator mapping GET requests with a route parameter | `:id` is a placeholder for dynamic values |
| `@Post()` | Decorator mapping HTTP POST requests | Creates new resources |
| `@Put(':id')` | Decorator mapping HTTP PUT requests | Updates entire existing resources |
| `@Delete(':id')` | Decorator mapping HTTP DELETE requests | Removes existing resources |
| `@Param('id')` | Decorator extracting URL parameters | Captures `:id` from route path |
| `@Body()` | Decorator extracting JSON request body | Accesses data sent by the client |
| `type Book` | TypeScript type alias | Defines the shape of a book object |
| `books.find()` | Array method searching for first matching element | Retrieves a single book by condition |
| `books.splice()` | Array method removing elements | Deletes an item at a specific index |

#### Breakdown

- **`findAll()`**: Retrieves all books from the array
- **`findOne()`**: Searches for a specific book by ID
- **`create()`**: Adds a new book to the array
- **`update()`**: Modifies an existing book's properties
- **`remove()`**: Deletes a book from the array

## Author

**Alvian Zachry Faturrahman**

- Web: https://alvianzf.id
- LinkedIn: https://linkedin.com/in/alvianzf
- Batch: [Your batch number]

