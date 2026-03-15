import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security & Performance Middlewares
  app.use(helmet());
  app.use(compression());
  app.use(morgan('dev'));

  // Use Global Filters for consistent error responses
  app.useGlobalFilters(new HttpExceptionFilter());

  // Use Global Pipes for validation and transformation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away any properties that do not have any decorators
      forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are present
      transform: true, // Automatically transforms payloads to be objects typed according to their DTO classes
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Introduction to NestJS')
    .setDescription('Learning DTOs, Pipes, and API Documentation')
    .setVersion('1.1')
    .addTag('books')
    .addTag('products')
    .addTag('users')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
