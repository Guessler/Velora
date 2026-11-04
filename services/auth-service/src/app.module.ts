import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module.js';
import { AuthenticationModule } from '@nestjs/authentication';
import { AuthorizationModule } from '@nestjs/authorization';

@Module({
  imports: [
    AuthenticationModule.forRootAsync({
      useFactory: () => ({
        accessToken: {
          key: process.env.JWT_SECRET!,
          issuer: 'https://api.example.com',
          audience: 'mobile-app',
          ttl: '15m',
        },
      }),
    }),
    AuthorizationModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres', // Тип БД (mysql, sqlite, mssql и др.)
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'nestjs_db',
      entities: [import.meta.dirname + '/**/*.entity{.ts,.js}'], // Где искать сущности
      synchronize: true, // Автоматическое обновление схемы (только для разработки!)
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
