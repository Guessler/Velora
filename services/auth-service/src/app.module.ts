import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',  // Тип БД (mysql, sqlite, mssql и др.)
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'nestjs_db',
      entities: [import.meta.dirname + '/**/*.entity{.ts,.js}'],  // Где искать сущности
      synchronize: true,  // Автоматическое обновление схемы (только для разработки!)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
