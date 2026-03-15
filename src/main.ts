import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
