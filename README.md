# Module 6 - First Week Day 4

## Topics Covered

- **Importance of API Documentation** 📖
- **Documenting Endpoints with Swagger** 🎨
- **Postman for API Documentation** 📬
- **API Documentation Best Practices** 🏆
- **Creating Postman Collections** �️
- **Sharing Documentation with Team** 🤝
- **Export and Import Collections** 🚀
- **Course Recap** 🎓

## Lecture Notes

### 📖 Importance of API Documentation

API documentation is the instruction manual for your backend.
Without it, Frontend Developers have to guess what data your API expects and what it returns, leading to bugs and frustration.

```mermaid
flowchart LR
    Frontend(["💻 Frontend Developer"])
    Backend(["🖥️ Backend API"])
    Docs["📄 API Documentation"]

    Frontend -- "Reads" --> Docs
    Docs -- "Explains how to use" --> Backend
    Frontend -- "Sends correct request" --> Backend
```

**Why it matters:**

- **Saves Time:** No more constant messages asking "what does this endpoint return?"
- **Onboarding:** New developers can instantly start working with your API.
- **Contract:** It acts as an agreement between the Frontend and Backend on exactly how data should be formatted.

### 🎨 Documenting Endpoints with Swagger

In NestJS, we automate our documentation using the **Swagger** module (`@nestjs/swagger`). This ensures our docs are always in sync with our code and provides a beautiful, interactive UI for anyone using our API.

#### Step 1. Install Dependencies

To get started, we need to add the necessary Swagger tools to our project. You can do this by running the following command in your terminal:

```bash
pnpm add @nestjs/swagger
```

This adds the core library that generates OpenAPI specifications and the Swagger UI for us.

#### Step 2. Initialize Swagger in `main.ts`

Next, we need to wire up Swagger in our entry point file, `src/main.ts`. By adding the `DocumentBuilder` and `SwaggerModule` setup inside our `bootstrap()` function, we tell NestJS how to "build" our documentation and where to serve it.

```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Inside bootstrap()
const config = new DocumentBuilder()
  .setTitle('Books API')
  .setDescription('The unofficial Books API description')
  .setVersion('1.0')
  .addTag('books')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

Once this is in place, NestJS will serve an interactive UI at the `/api` route.

#### Step 3. Tag the Controller

To keep things organized, we group our endpoints. By adding the `@ApiTags('books')` decorator to the top of our `src/books/books.controller.ts`, all related routes will be neatly categorized together in the Swagger UI and Postman.

```typescript
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController { ... }
```

#### Step 4. Describe Specific Endpoints

Now we can get specific. Using decorators like `@ApiOperation`, `@ApiResponse`, and `@ApiParam` inside `src/books/books.controller.ts`, we can explain exactly what each method does and what the status codes (like 200 or 404) represent.

```typescript
@Get(':id')
@ApiOperation({ summary: 'Retrieve a single book by ID' })
@ApiParam({ name: 'id', description: 'The unique ID of the book', example: '1' })
@ApiResponse({ status: 200, description: 'Return the found book.' })
@ApiResponse({ status: 404, description: 'Book not found.' })
findOne(@Param('id') id: string) { ... }
```

#### Step 5. Define Data Models in DTOs

Finally, we want to show the Frontend exactly what kind of data we expect to receive. By adding `@ApiProperty` decorators to the properties in `src/books/dto/create-book.dto.ts`, we provide clear, copy-pasteable examples of our data models.

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateBooksDto {
  @ApiProperty({ example: '1984', description: 'The title of the book' })
  title: string;

  @ApiProperty({ example: 328, description: 'Number of pages' })
  pages: number;
}
```

> **Accessing the Docs:** After following these steps, simply run `pnpm start:dev` and navigate to `http://localhost:3000/api` to see your documentation in action!

By adding these decorators, NestJS magically generates an "OpenAPI Specification" (a standard JSON format) that Swagger displays on its web page, and that Postman can read and instantly turn into beautiful documentation.

### 📬 Postman for API Documentation

Postman isn't just for checking if your server works; it's a powerful tool for generating and hosting beautiful API documentation that anyone can read.

1. You create a request in Postman.
2. You save it to a "Collection".
3. Add descriptions and save example responses.
4. Postman automatically generates a web page with code snippets for frontend developers to use.

### 🧪 Postman Auto Testing (Scripts)

Postman is not just for Documentation; it is also a powerful **Testing** tool. Instead of manually checking if a request returned `200 OK`, you can write tiny JavaScript "Tests" that run automatically after the request finishes.

In Postman, click on the **Scripts** tab > **Post-response**.

```javascript
// Test 1: Did the server return 200 OK?
pm.test('Status code is 200', function () {
  pm.response.to.have.status(200);
});

// Test 2: Did the server return data fast enough?
pm.test('Response time is under 200ms', function () {
  pm.expect(pm.response.responseTime).to.be.below(200);
});

// Test 3: Did the server actually return the correct Book Title?
pm.test('Book title is correct', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.title).to.eql('Harry Potter');
});
```

When you hit "Send", Postman will now show a **Test Results (3/3)** tab declaring if your backend is behaving exactly as it should! This is highly recommended to do before saving your requests to your Collections.

### 🏆 API Documentation Best Practices

1. **Keep it Updated:** Outdated documentation is worse than no documentation.
2. **Provide Examples:** Always include mock JSON request bodies and responses so people know what to expect.
3. **Document Errors:** Explain what a `400 Bad Request` or `404 Not Found` implies for each specific endpoint.
4. **Use Clear Descriptions:** Don't just say "Creates book". Say "Creates a new book and returns the generated Book ID".

### 🗂️ Creating Postman Collections

A **Collection** in Postman is simply a folder structure that holds your API requests together neatly.

```text
📚 My App Collection
├── 📁 Authentication
│   ├── 🔑 POST /login
│   └── 🚪 POST /logout
└── 📁 Books
    ├── 📖 GET /books
    ├── ➕ POST /books
    └── ❌ DELETE /books/:id
```

By organizing your requests into collections and folders, you make it incredibly easy for your team to navigate large APIs.

### 🤝 Sharing Documentation with Team

Building a great API is only half the battle; the other half is letting your team know how to use it! Postman gives us several seamless ways to share our work:

- **Team Workspaces:** You can invite your teammates directly into a Postman Workspace. This is the best way to collaborate because everyone sees live updates as you add or change requests.
- **Public Documentation:** This is one of Postman's coolest features! You can "Publish" your collection to create a beautiful, public web URL. This is perfect for external partners or Frontend developers who don't want to open the Postman app itself—they can just read your docs in their browser.
- **Exporting Files:** If you need to keep things simple and offline, you can always export your collection as a `.json` file and share it over Slack or Email for others to import.

### 🚀 Export and Import Collections

If you don't want to use Workspaces, you can physically share your documentation file.

- **Export:** Right-click the Postman Collection -> Export. It gives you a `.json` file containing all your requests and data.
- **Import:** Anyone can click "Import" in their Postman and select that JSON file to instantly get all your requests on their own computer.

---

### 🎓 Course Recap

Congratulations on finishing the first week of Module 6! 🎉

**What we covered:**

1. **Day 1:** Architecture Basics (Frontend vs. Server vs. Database) and REST API principles.
2. **Day 2:** Ensuring bad data doesn't crash our app using **ValidationPipes** and **DTOs** (The Bouncer and the VIP list).
3. **Day 3:** Organizing our factory using **Layered Architecture** (Controllers for HTTP, Services for Logic, Repositories for Data).
4. **Day 4:** Being a good teammate by providing clear **API Documentation** using Postman and NestJS Decorators.

You now have a solid foundation in modern Backend Engineering!

## Concept Glossary

| Term                    | Definition                                             | Usage                                                              |
| ----------------------- | ------------------------------------------------------ | ------------------------------------------------------------------ |
| `API Documentation`     | The instruction manual for an API                      | Read by Frontend Developers to integrate with the Backend          |
| `Swagger UI`            | An interactive web page for your API                   | Automatically generated by NestJS under `/api`                     |
| `Postman auto-scripts`  | JavaScript tests running automatically after a request | Used in Postman's "Scripts" tab to verify data and status codes    |
| `@ApiTags()`            | Swagger Decorator grouping endpoints                   | Organizes controllers in the documentation UI                      |
| `@ApiOperation()`       | Swagger Decorator defining an endpoint                 | Provides a summary/description of what the route does              |
| `@ApiResponse()`        | Swagger Decorator detailing responses                  | Shows expected status codes (e.g., 200 vs 400) and return data     |
| `@ApiProperty()`        | Swagger Decorator for DTO objects                      | Describes exact fields (type, description, example) in the payload |
| `Postman Collection`    | A folder-like structure saving API requests            | Used to neatly organize and share tested endpoints with a team     |
| `OpenAPI Specification` | The standard JSON format describing an API             | Swagger generates this automatically; Postman imports it           |

## Author

**Alvian Zachry Faturrahman**

- Web: https://alvianzf.id
- LinkedIn: https://linkedin.com/in/alvianzf
