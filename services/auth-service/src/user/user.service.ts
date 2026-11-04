import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

export interface CreateUserData {
  email: string;
  name?: string | null;
  passwordHash: string;
}

const normalizeEmail = (email: string) =>
  email.trim().normalize('NFC').toLowerCase();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async create(data: CreateUserData): Promise<User> {
    const user = this.users.create({
      email: normalizeEmail(data.email),
      name: data.name ?? null,
      passwordHash: data.passwordHash,
    });

    return this.users.save(user);
  }

  findCredentials(email: string) {
    return this.users
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email: normalizeEmail(email) })
      .getOne();
  }

  async updatePasswordHash(id: string, passwordHash: string): Promise<void> {
    await this.users.update({ id }, { passwordHash });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.users.findOne({ where: { email: normalizeEmail(email) } });
  }

  findById(id: string): Promise<User | null> {
    return this.users.findOne({ where: { id } });
  }

  getMe() {
    return 'getMe';
  }
}
