import { Module } from '@nestjs/common';
import { BrandService } from './brand.service.js';
import { BrandResolver } from './brand.resolver.js';
import { Brand } from './model/brand.model.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandResolver, BrandService],
})
export class BrandModule {}
