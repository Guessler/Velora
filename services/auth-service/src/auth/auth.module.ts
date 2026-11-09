import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module.js';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtAuth } from './jwt-auth.provider.js';
import { TypeOrmRefreshTokenStore } from './refresh-token.store.js';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuth, TypeOrmRefreshTokenStore],
  exports: [AuthService],
})
export class AuthModule {}
