import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BrandService } from './brand.service.js';
import { Brand } from './model/brand.model.js';
import { UpdateBrandInput } from './dto/update-product.input.js';
import { CreateBrandInput } from './dto/create-brand.dto.js';
import { UseGuards } from '@nestjs/common';
import { RolesGuard, type AuthUser } from '../auth/role.guard.js';

@Resolver()
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Query(() => [Brand], { name: 'Brands' })
  async getBrands() {
    return this.brandService.findAll();
  }

  @Query(() => Brand, { name: 'Brand', nullable: true })
  async getBrand(@Args('id') id: string) {
    return this.brandService.findOneById(id);
  }

  @UseGuards(RolesGuard)
  @Mutation(() => Brand)
  async createBrand(
    @Args('input') input: CreateBrandInput,
    @Context('req') req: { user: AuthUser },
  ) {
    return this.brandService.create(input, req.user);
  }

  @UseGuards(RolesGuard)
  @Mutation(() => Brand)
  async updateBrand(
    @Args('id') id: string,
    @Args('input') input: UpdateBrandInput,
    @Context('req') req: { user: AuthUser },
  ) {
    return this.brandService.update(id, input, req.user);
  }

  @UseGuards(RolesGuard)
  @Mutation(() => Boolean)
  async deleteBrand(
    @Args('id') id: string,
    @Context('req') req: { user: AuthUser },
  ) {
    return this.brandService.remove(id, req.user);
  }
}
