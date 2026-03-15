# Additional Lesson: Master Global Error Handling in NestJS

In a production application, delivering consistent error messages is just as important as delivering consistent data. NestJS **Exception Filters** allow you to catch errors across your entire application and format them into a unified structure.

## ❓ Why use Global Exception Filters?

Without a global filter, NestJS returns errors in its default format, which might not match your custom `ApiResponse` structure. This creates friction for frontend developers who have to write different logic for success and error cases.

**Benefits:**
- **Consistency**: Every response (200 or 404) has the same top-level keys (`status`, `message`, `data`).
- **Clean Controllers**: You don't need `try/catch` blocks in every controller. Just throw the error, and the filter handles the rest.
- **Security**: You can catch unexpected 500 errors and hide sensitive stack traces from the user.
- **Improved UX**: Transform complex validation arrays into user-friendly strings.

## 🛠️ The Exception Lifecycle

When a service throws an error, it doesn't just crash. It travels through the NestJS lifecycle until it's caught by a filter.

```mermaid
flowchart TD
    Service["🏗️ Service (throws NotFoundException)"]
    Controller["🎮 Controller (passes error up)"]
    Filter["🛡️ Global Exception Filter (Caught)"]
    ApiResponse["📦 ApiResponse Format"]
    Client["🌐 Client Received"]

    Service --> Controller
    Controller --> Filter
    Filter --> ApiResponse
    ApiResponse --> Client
```

## 🔄 Exception Filters vs. Middleware

While both intercept requests and responses, they serve different purposes and sit at different locations in the **Request-Response Pipeline**.

### 1. The Key Differences

| Feature | Middleware | Exception Filter |
| :--- | :--- | :--- |
| **Execution** | Runs **BEFORE** the route handler (Controller). | Runs **AFTER** a handler throws an exception. |
| **Scope** | Generic (Logging, Auth, Body Parsing). | Error-specific (Catching, Formatting). |
| **Awareness** | Knows about the raw Request/Response. | Knows about the **Exception** and the Execution Context. |
| **Replacement** | Can handle pre-processing tasks. | **CANNOT** be easily replaced by middleware for error handling. |

### 2. Can they be replaced?

**Technically Yes, Practically No.**
You *could* wrap your entire app in a middleware with a `try/catch` block, but this is an anti-pattern in NestJS because:
1.  **Lost Context**: Middleware doesn't have access to NestJS-specific metadata (like which controller or method was called).
2.  **Boilerplate**: You would have to manually handle every type of exception.
3.  **NestJS Ecosystem**: Many built-in features (like `ValidationPipe`) rely on the built-in exception layer to work correctly.

### 3. The Pipeline Diagram

```mermaid
flowchart LR
    Client["🌐 Client"]
    MW["⚙️ Middleware"]
    Guard["🛡️ Guard"]
    Pipe["🧪 Pipe"]
    Controller["🎮 Controller"]
    Filter["🩹 Filter (ErrorHandler)"]
    Response["📤 Response"]

    Client --> MW --> Guard --> Pipe --> Controller
    Controller -- "Success" --> Response
    Controller -- "Exception" --> Filter
    Filter --> Response
```

## 🏗️ Inside the `HttpExceptionFilter`

The `HttpExceptionFilter` is a class that implements the `ExceptionFilter` interface. It has one job: catch an exception and send a clean JSON response.

### 1. The Filter Anatomy

```mermaid
classDiagram
    class HttpExceptionFilter {
        +catch(exception: unknown, host: ArgumentsHost)
    }
    ExceptionFilter <|-- HttpExceptionFilter : implements
```

### 2. Deep Dive: Context and the Response Object

In the `catch()` method, we see two critical objects: `ArgumentsHost` and the concepts of "Context".

#### What is `ArgumentsHost` (`host`)?
NestJS is designed to be **platform-agnostic**. This means your logic could be running on Express, Fastify, WebSockets, or even a Microservice. The `ArgumentsHost` is a container that holds the original arguments passed to the handler, regardless of the platform.

#### What is `ctx` (`switchToHttp()`)?
Since we are building a Web API, we need to access HTTP-specific features like headers and status codes.
```typescript
const ctx = host.switchToHttp();
```
The `switchToHttp()` method tells Nest: *"I know I'm in an HTTP environment, please give me the HTTP-specific helpers."* The resulting `ctx` (HttpArgumentsHost) now has methods like `getRequest()` and `getResponse()`.

#### The `getResponse<Response>()` Method
This is the line where we finally get the power to send data back to the user:
```typescript
const response = ctx.getResponse<Response>();
```
- **`getResponse()`**: Grabs the underlying platform response object (in our case, the **Express Response** object).
- **`<Response>`**: This is a TypeScript generic. By passing `<Response>` (from `express`), we tell the compiler exactly what methods are available on this object (like `.status()` and `.json()`).

### 3. The Logic Flow

```mermaid
flowchart TD
    Start["🏁 catch(exception, host)"]
    Context["🔌 Switch to HTTP Context"]
    GetRes["📥 Get Express Response Object"]
    CheckType{"❓ Is HttpException?"}
    
    GetStatus["🔢 Get HTTP Status (e.g., 404, 400)"]
    InternalStatus["🔢 Default to 500 (Internal)"]
    
    ExtractMessage["📝 Extract Error Message"]
    DefaultMessage["📝 Default to 'Internal Server Error'"]
    
    Format["✨ Wrap in ApiResponse<null>"]
    Send["📤 response.status().json()"]

    Start --> Context
    Context --> GetRes
    GetRes --> CheckType
    
    CheckType -- Yes --> GetStatus
    CheckType -- No --> InternalStatus
    
    GetStatus --> ExtractMessage
    InternalStatus --> DefaultMessage
    
    ExtractMessage --> Format
    DefaultMessage --> Format
    
    Format --> Send
```

## 📜 Code Breakdown (`src/common/filters/http-exception.filter.ts`)

### Syntax & Function Reference

| Syntax | What is it? | Function |
| :--- | :--- | :--- |
| **`@Catch()`** | Decorator | Marks the class as an exception filter. If empty, it catches ALL exceptions. |
| **`ArgumentsHost`** | Utility Type | Gives access to the underlying request/response objects (Express or Fastify). |
| **`switchToHttp()`** | Method | Specific to HTTP apps, allows us to retrieve the `Request` and `Response`. |
| **`exception instanceof HttpException`** | Logic | Checks if the caught error is a standard NestJS HTTP error. |
| **`status`** | Variable | The numeric code (e.g., 404) that will be returned to the client. |
| **`apiResponse`** | Object | Our custom standardized `{ status, message, data }` structure. |

### How Validation Errors are Handled
When `ValidationPipe` fails, it throws a `BadRequestException` containing an array of messages. Our filter intelligently handles this:

```typescript
// Converts array ['name must be string', 'price must be positive']
// Into a single string: "name must be string, price must be positive"
message: Array.isArray(message) ? message.join(', ') : message
```

## 🌳 File Tree & Integration

```text
📁 src
├── 📁 common
│   └── 📁 filters
│       └── 📄 http-exception.filter.ts  <-- The Filter Logic
├── 📁 types
│   └── 📄 api-response.interface.ts     <-- shared contract
└── 📄 main.ts                           <-- Global Registration
```

### Global Registration in `main.ts`
To activate the filter for every single route in your app, use `app.useGlobalFilters()`:

```typescript
// main.ts
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Register globally!
  app.useGlobalFilters(new HttpExceptionFilter());
  
  await app.listen(3000);
}
```

---

## ✍️ Author
**Alvian Zachry Faturrahman**
- Web: [alvianzf.id](https://alvianzf.id)
- LinkedIn: [alvianzf](https://linkedin.com/in/alvianzf)
