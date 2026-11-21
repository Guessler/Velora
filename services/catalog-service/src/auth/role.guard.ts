import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role, ROLES_KEY } from './roles.decorator.js';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthUser {
  sub: string;
  role?: string;
}

export function assertOwner(
  ownerId: string | null | undefined,
  user: AuthUser,
): void {
  if (user.role === Role.ADMIN) return;
  if (!ownerId || ownerId !== user.sub) {
    throw new ForbiddenException('Недостаточно прав');
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request =  GqlExecutionContext.create(context).getContext().req;
    const token = request.cookies?.['access_token'];

    if (!token) {
      throw new UnauthorizedException('Токен не найден');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;

      if (!requiredRoles) {
        return true;
      }
      const hasRole = requiredRoles.includes(payload.role);
      if (!hasRole) {
        throw new ForbiddenException('Недостаточно прав');
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException('Невалидный токен');
    }
  }
}
