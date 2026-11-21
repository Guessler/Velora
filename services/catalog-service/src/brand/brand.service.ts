import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './model/brand.model.js';
import { Repository } from 'typeorm';
import { CreateBrandInput } from './dto/create-brand.dto.js';
import { UpdateBrandInput } from './dto/update-product.input.js';
import { assertOwner, type AuthUser } from '../auth/role.guard.js';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brand: Repository<Brand>,
  ) {}
  async findAll() {
    return this.brand.find({
      order: { createdAt: 'desc' },
    });
  }

  async findOneById(id: string) {
    const brand = await this.brand.findOne({
      where: {
        id: id,
      },
    });

    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }

    return brand;
  }

  async create(input: CreateBrandInput, user: AuthUser) {
    const brand = this.brand.create({
      ...input,
      ownerId: user.sub,
    });

    return this.brand.save(brand);
  }

  async update(id: string, input: UpdateBrandInput, user: AuthUser) {
    const brand = await this.findOneById(id);
    assertOwner(brand.ownerId, user);

    Object.assign(brand, input);

    return this.brand.save(brand);
  }

  async remove(id: string, user: AuthUser) {
    const brand = await this.findOneById(id);
    assertOwner(brand.ownerId, user);

    await this.brand.remove(brand);

    return true;
  }
}
