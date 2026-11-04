import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module.js';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtAuth } from './jwt-auth.provider.js';
import { RefreshToken } from './entities/refresh.entity.js';
import { RevokedRefreshFamily } from './entities/revoked-refresh-family.entity.js';
// import { TypeOrmRefreshTokenStore } from './refresh-token.store.js';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([RefreshToken, RevokedRefreshFamily]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuth],
  exports: [AuthService],
})
export class AuthModule {}
