import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from './model/category.model.js';
import { CategoryService } from './category.service.js';
import { CreateCategoryInput } from './dto/create-category.dto.js';
import { UpdateCategoryInput } from './dto/update-product.input.js';
import { UseGuards } from '@nestjs/common';
import { RolesGuard, type AuthUser } from '../auth/role.guard.js';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category], { name: 'Categories' })
  async getCategories() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'Category', nullable: true })
  async getCategory(@Args('id') id: string) {
    return this.categoryService.findOneById(id);
  }

  @UseGuards(RolesGuard)
  @Mutation(() => Category)
  async createCategory(
    @Args('input') input: CreateCategoryInput,
    @Context('req') req: { user: AuthUser },
  ) {
    return this.categoryService.create(input, req.user);
  }

  @UseGuards(RolesGuard)
  @Mutation(() => Category)
  async updateCategory(
    @Args('id') id: string,
    @Args('input') input: UpdateCategoryInput,
    @Context('req') req: { user: AuthUser },
  ) {
    return this.categoryService.update(id, input, req.user);
  }

  @UseGuards(RolesGuard)
  @Mutation(() => Boolean)
  async deleteCategory(
    @Args('id') id: string,
    @Context('req') req: { user: AuthUser },
  ) {
    return this.categoryService.remove(id, req.user);
  }
}
