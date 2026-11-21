import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.dto.js';
import { UpdateCategoryInput } from './dto/update-product.input.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './model/category.model.js';
import { Repository } from 'typeorm';
import { assertOwner, type AuthUser } from '../auth/role.guard.js';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly category: Repository<Category>,
  ) {}

  async findAll() {
    return this.category.find({
      order: { createdAt: 'desc' },
    });
  }

  async findOneById(id: string) {
    const category = await this.category.findOne({
      where: {
        id: id,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }

    return category;
  }

  async create(input: CreateCategoryInput, user: AuthUser) {
    const category = this.category.create({
      ...input,
      ownerId: user.sub,
    });

    return this.category.save(category);
  }

  async update(id: string, input: UpdateCategoryInput, user: AuthUser) {
    const category = await this.findOneById(id);
    assertOwner(category.ownerId, user);

    Object.assign(category, input);
    return this.category.save(category);
  }

  async remove(id: string, user: AuthUser) {
    const category = await this.findOneById(id);
    assertOwner(category.ownerId, user);

    await this.category.remove(category);

    return true;
  }
}
