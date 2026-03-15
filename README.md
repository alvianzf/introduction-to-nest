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
└── 📄 main.ts                    <-- Global configurations & 3rd Party MW
└── 📄 app.module.ts              <-- Custom MW Registration
```

---

## 📜 Tutorial: Mastering Middlewares

### 1. Custom Logger Middlewares
**What**: Functions that log request metadata (method, URL, user-agent).
**Why**: Crucial for observability and debugging what's happening in your app.

**Implementation (`src/common/middleware/logger.middleware.ts`):**
```typescript
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[LOG] ${req.method} ${req.originalUrl}`);
    next();
  }
}
```

**Registration (`src/app.module.ts`):**
```typescript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```

### 2. Custom Authentication Middleware
**What**: A middleware that validates credentials before allowing access to a route.
**Why**: To secure specific resources (like `/users`) without cluttering controllers.

**Implementation (`src/common/middleware/auth.middleware.ts`):**
```typescript
const apiKey = req.headers['x-api-key'];
if (!apiKey || apiKey !== 'introduction-to-nestjs') {
  throw new UnauthorizedException('Invalid API Key');
}
```

**Registration (`src/app.module.ts`):**
```typescript
// Apply specifically to the 'users' route
consumer.apply(AuthMiddleware).forRoutes('users');
```

### 3. Industry Standard Middlewares

#### 🛡️ Helmet
**What**: Sets security-related HTTP headers.
**Why**: Protects against common vulnerabilities like XSS and clickjacking.
**Install**: `pnpm add helmet`
**Registration (`src/main.ts`):**
```typescript
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet()); 
}
```

#### 📊 Morgan
**What**: A refined HTTP request logger.
**Why**: Provides standardized logs for traffic analysis.
**Install**: `pnpm add morgan`
**Registration (`src/main.ts`):**
```typescript
import morgan from 'morgan';
app.use(morgan('dev'));
```

#### ⚡ Compression
**What**: Compresses response payloads (Gzip).
**Why**: Reduces bandwidth usage and speeds up responses for users.
**Install**: `pnpm add compression`
**Registration (`src/main.ts`):**
```typescript
import compression from 'compression';
app.use(compression());
```

### 4. Advanced: Request Tracking
**What**: Generating a unique UUID for every incoming request.
**Why**: To trace a request's lifecycle across logs and return it in headers.
**Install**: `pnpm add uuid`

**Implementation (`src/common/middleware/request-tracking.middleware.ts`):**
```typescript
const requestId = uuidv4();
req['requestId'] = requestId;
res.setHeader('X-Request-ID', requestId);
```

**Registration (`src/app.module.ts`):**
```typescript
// Register alongside logger for all routes
consumer.apply(LoggerMiddleware, RequestTrackingMiddleware).forRoutes('*');
```

### 5. Rate Limiting (Throttler)
**What**: Restricting the number of requests a client can make in a timeframe.
**Why**: Prevents brute-force attacks and resource exhaustion.
**Install**: `pnpm add @nestjs/throttler`

**Registration (`src/app.module.ts`):**
```typescript
@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
```

---

## 💡 Key Takeaways & Extra Lessons
- [Codebase Analysis & Best Practices](./CODEBASE_ANALYSIS.md)

---

## ✍️ Author
**Alvian Zachry Faturrahman**
- Web: [alvianzf.id](https://alvianzf.id)
- LinkedIn: [alvianzf](https://linkedin.com/in/alvianzf)
