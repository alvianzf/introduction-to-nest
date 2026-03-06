
# Module 6 - First Week Day 3

## Topics Covered

- **Review of CRUD Operations**
- **Service Layer Implementation**
- **Repository Pattern**
- **Implementing Complete CRUD API**
- **Custom Business Logic**
- **Request Lifecycle in NestJS** 🔄

## Lecture Notes

### Review of CRUD Operations

CRUD operations form the foundation of most applications:
- **Create (POST)**: Add new resources to the database
- **Read (GET)**: Retrieve existing resources
- **Update (PUT/PATCH)**: Modify existing resources
- **Delete (DELETE)**: Remove resources

Each operation maps to a specific HTTP method and database action.

### Service Layer Implementation

Services contain business logic and are injected into controllers. They handle data processing, database interactions, and complex operations:

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  private books = [];

  create(createBookDto) {
    const newBook = { id: Date.now(), ...createBookDto };
    this.books.push(newBook);
    return newBook;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    return this.books.find(book => book.id === id);
  }

  update(id: number, updateBookDto) {
    const book = this.findOne(id);
    if (book) Object.assign(book, updateBookDto);
    return book;
  }

  delete(id: number) {
    this.books = this.books.filter(book => book.id !== id);
    return { message: 'Book deleted' };
  }
}
```

### Repository Pattern

The Repository Pattern abstracts data access logic, making code more testable and maintainable:

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksRepository {
  private books = [];

  save(book) {
    this.books.push(book);
    return book;
  }

  findAll() {
    return this.books;
  }

  findById(id: number) {
    return this.books.find(book => book.id === id);
  }

  update(id: number, book) {
    const index = this.books.findIndex(b => b.id === id);
    if (index !== -1) this.books[index] = { ...this.books[index], ...book };
    return this.books[index];
  }

  delete(id: number) {
    this.books = this.books.filter(book => book.id !== id);
  }
}
```

### Implementing Complete CRUD API

Integrate the service into a controller to expose CRUD endpoints:

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/create-books.dto';
import { UpdateBooksDto } from './dto/update-books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBooksDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBooksDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.booksService.delete(+id);
  }
}
```

### Custom Business Logic

Add domain-specific logic to services for filtering, calculations, or validations:

```typescript
@Injectable()
export class BooksService {
  // ... existing methods

  findByAuthor(author: string) {
    return this.books.filter(book => book.author.toLowerCase() === author.toLowerCase());
  }

  getAvailableBooks() {
    return this.books.filter(book => book.isAvailable);
  }

  borrowBook(id: number) {
    const book = this.findOne(id);
    if (!book?.isAvailable) throw new Error('Book not available');
    book.isAvailable = false;
    return book;
  }
}
```

### Request Lifecycle in NestJS

Understanding the request flow helps optimize and debug applications:

1. **Request arrives** → HTTP request sent to the application
2. **Middleware executes** → Global or route-specific middleware processes the request
3. **Guards execute** → Authentication/authorization checks occur
4. **Interceptors (before)** → Pre-processing logic before controller method
5. **Controller method** → Route handler executes
6. **Service layer** → Business logic and data operations
7. **Interceptors (after)** → Post-processing logic after controller method
8. **Response sent** → Response returned to the client

## Syntax Glossary

| Term | Definition | Usage |
|------|-----------|-------|
| `@Injectable()` | Decorator marking a class as a provider for dependency injection | Services, repositories |
| `constructor(private service: Service)` | Dependency injection via constructor | Injects services into controllers |
| `@Param('id')` | Extracts URL route parameters | Captures dynamic values from path |
| `+id` | Type coercion operator | Converts string parameter to number |
| `find()` | Array method returning first match | Retrieves single item by condition |
| `filter()` | Array method returning filtered array | Retrieves multiple items by condition |
| `Repository Pattern` | Data access abstraction layer | Separates data logic from business logic |
| `Service Layer` | Business logic container | Handles CRUD and custom operations |
| `Object.assign()` | Merges object properties | Updates object with new values |
| `Middleware` | Processes requests before controllers | Logging, authentication setup |
| `Guards` | Authorization checks before handlers | Permission validation |
| `Interceptors` | Pre/post-processing hooks | Logging, error handling, transformation |
| `Request Lifecycle` | Path from request to response | Understanding NestJS execution order |

## Author

**Alvian Zachry Faturrahman**

- Web: https://alvianzf.id
- LinkedIn: https://linkedin.com/in/alvianzf

