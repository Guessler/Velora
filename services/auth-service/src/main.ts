import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

try {
  process.loadEnvFile();
} catch {
  // .env is optional (production provides real environment variables).
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
