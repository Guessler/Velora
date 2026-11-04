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

// Пример: CSRF_TRUSTED_ORIGINS=http://localhost:3001,https://app.example.com
const trustedOrigins = (process.env.CSRF_TRUSTED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: trustedOrigins.length > 0 ? trustedOrigins : true,
    credentials: true,
  });

  app.enableCsrfProtection({ trustedOrigins });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
