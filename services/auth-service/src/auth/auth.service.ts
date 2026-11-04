import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import {
  PasswordHasher,
  RefreshTokenError,
  TokenService,
} from '@nestjs/authentication';
import { User } from '../user/entities/user.entity.js';
import { UserService } from '../user/user.service.js';
import { SignInDto, SignUpDto } from './dto/auth.dto.js';

export type PublicUser = Omit<User, 'passwordHash' | 'refreshHash'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async register(data: SignUpDto): Promise<PublicUser> {
    if (await this.userService.findByEmail(data.email)) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await this.passwordHasher.hash(data.password);

    try {
      const user = await this.userService.create({
        email: data.email,
        name: data.name,
        passwordHash,
      });
      return this.toPublicUser(user);
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new ConflictException('Email already registered');
      }
      throw error;
    }
  }

  async verify(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findCredentials(email);
    const valid = await this.passwordHasher.verify(
      password,
      user?.passwordHash,
    );

    if (!valid || !user?.passwordHash) {
      return null;
    }
    if (this.passwordHasher.needsRehash(user.passwordHash)) {
      const newHash = await this.passwordHasher.hash(password);
      await this.userService.updatePasswordHash(user.id, newHash);
    }

    return user;
  }

  login(user: Pick<PublicUser, 'id'>) {
    return this.tokens.issue(user.id, { method: 'password' });
  }

  async logout(refreshToken: string): Promise<boolean> {
    return this.tokens.revoke(refreshToken);
  }

  async refresh(refreshToken: string) {
    try {
      return await this.tokens.refresh(refreshToken);
    } catch (error) {
      if (error instanceof RefreshTokenError) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      throw error;
    }
  }

  csrf() {
    return 'csrf';
  }

  private toPublicUser({
    passwordHash,
    refreshHash,
    ...user
  }: User): PublicUser {
    return user;
  }
}

function isUniqueViolation(error: unknown): boolean {
  return (
    error instanceof QueryFailedError &&
    (error.driverError as { code?: string } | undefined)?.code === '23505'
  );
}
