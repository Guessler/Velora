import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product.model.js';
import { ProductImage } from './model/product-image.entity.js';
import { ProductService } from './product.service.js';
import { ProductResolver } from './product.resolver.js';
import { S3Service } from '../storage/s3.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
  providers: [ProductResolver, ProductService, S3Service],
})
export class ProductModule {}
