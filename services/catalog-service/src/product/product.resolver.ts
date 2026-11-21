import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service.js';
import { Product } from './model/product.model.js';
import { CreateProductInput } from './dto/create-product.input.js';
import { UpdateProductInput } from './dto/update-product.input.js';
import { UseGuards } from '@nestjs/common';
import { RolesGuard, type AuthUser } from '../auth/role.guard.js';
import { PaginationDto } from './dto/pagination.dto.js';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { name: 'products' })
  async getProducts(@Args() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @Query(() => Product, { name: 'product', nullable: true })
  async getProduct(@Args('id') id: string) {
    return this.productService.findOneById(id);
  }

  @UseGuards(RolesGuard)
  @Mutation(() => Product)
  async createProduct(
    @Args('input') input: CreateProductInput,
    @Context('req') req: { user: AuthUser },
  ) {
    return this.productService.create(input, req.user);
  }

  @UseGuards(RolesGuard)
  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: UpdateProductInput,
    @Context('req') req: { user: AuthUser },
  ) {
    return this.productService.update(id, input, req.user);
  }

  @UseGuards(RolesGuard)
  @Mutation(() => Boolean)
  async deleteProduct(
    @Args('id') id: string,
    @Context('req') req: { user: AuthUser },
  ) {
    return this.productService.remove(id, req.user);
  }
}
