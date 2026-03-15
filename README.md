# Module 6: Leveling Up with Middlewares

Welcome to Day 6! Up until now, we've been focused on the "meat" of our application—Controllers and Services. Today, we're building the "skin" and "nervous system." Think of **Middlewares** as the gatekeepers and watchers that handle everything before your code even starts thinking about business logic.

---

## 🏗 Where we are in the project

We've centralized our logic in a clean way:
- **`src/common/middleware`**: This is where our custom brains live (Loggers, Auth, Tracking).
- **`main.ts`**: Our global entry point where we plugin industry-standard security and speed.
- **`app.module.ts`**: The orchestration layer where we tell Nest exactly which gates should guard which paths.

---

## 📜 The Middleware Journey

### 1. Observability with Custom Loggers
In professional apps, if you don't log it, it didn't happen. We started by building a **Logger Middleware**. Its only job is to shout out in the terminal every time a request hits our server. 

We used a **Class-based Middleware** because it gives us the power of Nest's Dependency Injection later on. You'll find it in `src/common/middleware/logger.middleware.ts`. 

To make this the "eyes" of our entire app, we registered it in `src/app.module.ts` using the `.forRoutes('*')` pattern. This ensures every single hit—no matter the route—is accounted for.

### 2. Guarding the Gates: Custom Auth
Not everyone should be allowed to touch our user data. We built an **AuthMiddleware** to act as a bouncer. It checks the `x-api-key` header for a specific "secret password" (`introduction-to-nestjs`).

Unlike the logger, we don't want this everywhere. We applied it specifically to the `users` route in `AppModule`. If the key is missing or wrong, we throw an `UnauthorizedException` before the request even reaches the `UsersController`.

---

## 🏭 Production-Grade Guardians

When building for the real world, you don't reinvent the wheel—you use battle-tested tools. We've integrated three heavy-hitters in our `main.ts` using `app.use()`.

### 🛡️ Secure by Default with Helmet
The web is a scary place. **Helmet** is like bringing a shield to a sword fight; it automatically sets a dozen HTTP headers that protect your users from common attacks like Cross-Site Scripting (XSS) and clickjacking. We simply install it with `pnpm add helmet` and plug it into `main.ts`.

### 📊 Keeping Tabs with Morgan
While our custom logger is great for learning, **Morgan** is the industry standard for HTTP logging. It gives us a standardized, color-coded output that helps us see at a glance how long requests take and what the status codes are. One quick `pnpm add morgan` and `app.use(morgan('dev'))` makes our terminal look like a pro dev's cockpit.

### ⚡ Speeding up with Compression
Nobody likes a slow API. **Compression** uses Gzip to shrink our response data (like giant JSON lists) before sending them over the internet. This saves bandwidth and makes your app feel snappier. After `pnpm add compression`, we enable it globally so our app stays light on its feet.

---

## 🛰️ Advanced: Tracing & Throttling

### The Invisible String: Request Tracking
Imagine a bug happens. How do you find the EXACT logs for that one specific request? We solved this by creating a **Request Tracking Middleware**. It uses the `uuid` library to generate a unique ID for every single request. 

We attach this ID to the request object and—crucially—send it back in the `X-Request-ID` header. Now, if a user has an issue, they can give us that ID, and we can find every log entry related to their specific journey.

### Keeping it Fair: Rate Limiting
To prevent someone from accidentally (or maliciously) smashing our API, we integrated the `@nestjs/throttler`. In `AppModule`, we set a limit of **10 requests per minute**. If someone gets too greedy, Nest will automatically cool them down with a `429 Too Many Requests` response.

---

## 💡 Pro Tips for Juniors
Don't just copy-paste! I've written a deep-dive in [CODEBASE_ANALYSIS.md](./CODEBASE_ANALYSIS.md) about *why* we use these patterns. Go read it to understand how professional teams structure their "Defensive Layer."

---

## ✍️ Author
**Alvian Zachry Faturrahman**
- Web: [alvianzf.id](https://alvianzf.id)
- LinkedIn: [alvianzf](https://linkedin.com/in/alvianzf)
