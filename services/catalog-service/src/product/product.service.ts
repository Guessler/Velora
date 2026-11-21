import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input.js';
import { Product } from './model/product.model.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProductInput } from './dto/update-product.input.js';
import { assertOwner, type AuthUser } from '../auth/role.guard.js';
import { PaginationDto } from './dto/pagination.dto.js';
import { S3Service } from '../storage/s3.service.js';
import { ProductImage } from './model/product-image.entity.js';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
    private readonly s3Service: S3Service,
    @InjectRepository(ProductImage)
    private readonly productImages: Repository<ProductImage>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 100, offset = 0 } = paginationDto;

    const [products, total] = await this.products.findAndCount({
      take: limit,
      skip: offset,
      order: { id: 'ASC' },
    });

    return {
      data: products,
      count: total,
    };
  }

  async findOneById(id: string) {
    const product = await this.products.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  async create(input: CreateProductInput, user: AuthUser) {
    const { imageKeys, ...productData } = input;

    const product = this.products.create({
      ...productData,
      images: (imageKeys ?? []).map((key) =>
        this.productImages.create({ key }),
      ),
    });

    return this.products.save(product);
  }

  async update(id: string, input: UpdateProductInput, user: AuthUser) {
    const product = await this.findOneById(id);
    assertOwner(product.sellerId, user);

    const { imageKeys, ...productData } = input;

    Object.assign(product, productData);

    if (imageKeys !== undefined) {
      product.images = imageKeys.map((key) =>
        this.productImages.create({ key }),
      );
    }

    return this.products.save(product);
  }

  async remove(id: string, user: AuthUser) {
    const product = await this.findOneById(id);
    assertOwner(product.sellerId, user);

    for (const image of product.images) {
      await this.s3Service.deleteFile(image.key);
    }

    await this.products.remove(product);

    return true;
  }
}
