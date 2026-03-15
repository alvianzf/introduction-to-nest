# Module 6, Second Week Day 2: Middlewares in NestJS

Welcome to Day 6! Today we focus on **Middlewares**, the first line of defense and processing in the NestJS request-response pipeline.

## 🏗 Project Structure

```text
📁 src
├── 📁 common
│   └── 📁 middleware             <-- Centralized Middlewares
│       ├── 📄 logger.middleware.ts
│       ├── 📄 auth.middleware.ts
│       └── 📄 request-tracking.middleware.ts
└── 📄 main.ts                    <-- Global configurations
```

---

## 📜 Tutorial: Mastering Middlewares

### 1. Custom Logger Middlewares
**What**: Functions that log request metadata (method, URL, user-agent).
**Why**: Crucial for observability and debugging what's happening in your app.

**Functional Example:**
```typescript
export function logger(req, res, next) {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
}
```

**Class Example (registered in `AppModule`):**
```typescript
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[CLASS-LOG] ${req.method} ${req.originalUrl}`);
    next();
  }
}
```

### 2. Custom Authentication Middleware
**What**: A middleware that validates credentials before allowing access to a route.
**Why**: To secure specific resources (like `/users`) without cluttering controllers.

**Example (API Key Validation):**
```typescript
const apiKey = req.headers['x-api-key'];
if (!apiKey || apiKey !== 'introduction-to-nestjs') {
  throw new UnauthorizedException('Invalid API Key');
}
```

### 3. Industry Standard Middlewares

#### 🛡️ Helmet
**What**: Sets security-related HTTP headers.
**Why**: Protects against common vulnerabilities like XSS and clickjacking.
**Install**: `pnpm add helmet`
**Implementation**: `app.use(helmet())`

#### 📊 Morgan
**What**: A refined HTTP request logger.
**Why**: Provides standardized logs for traffic analysis.
**Install**: `pnpm add morgan`
**Implementation**: `app.use(morgan('dev'))`

#### ⚡ Compression
**What**: Compresses response payloads (Gzip).
**Why**: Reduces bandwidth usage and speeds up responses for users.
**Install**: `pnpm add compression`
**Implementation**: `app.use(compression())`

### 4. Advanced: Request Tracking
**What**: Generating a unique UUID for every incoming request.
**Why**: To trace a request's lifecycle across logs and return it in headers for client-side reporting.
**Install**: `pnpm add uuid`

**Logic:**
```typescript
const requestId = uuidv4();
req['requestId'] = requestId;
res.setHeader('X-Request-ID', requestId);
```

### 5. Rate Limiting (Throttler)
**What**: Restricting the number of requests a client can make in a timeframe.
**Why**: Prevents brute-force attacks and resource exhaustion.
**Install**: `pnpm add @nestjs/throttler`

**Implementation (`AppModule`):**
```typescript
ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }])
```

---

## 💡 Key Takeaways & Extra Lessons
- [Codebase Analysis & Best Practices](./CODEBASE_ANALYSIS.md)

---

## ✍️ Author
**Alvian Zachry Faturrahman**
- Web: [alvianzf.id](https://alvianzf.id)
- LinkedIn: [alvianzf](https://linkedin.com/in/alvianzf)
