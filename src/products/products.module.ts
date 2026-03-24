import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: ProductRepository,
      useFactory: () => {
        // Factory logic: here we could decide which implementation to return
        // (e.g., based on env vars or other providers).
        return new ProductRepository();
      },
    },
  ],
})
export class ProductsModule {}
