import { Module } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CategoryResolver } from './category.resolver.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './model/category.model.js';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
