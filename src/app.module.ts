import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthMiddleware } from './common/middleware/auth.middleware';

@Module({
  imports: [BooksModule, ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Global Logging
    consumer.apply(LoggerMiddleware).forRoutes('*');

    // Authentication for Users only
    consumer.apply(AuthMiddleware).forRoutes('users');
  }
}
