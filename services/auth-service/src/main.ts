import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import morgan from 'morgan';

try {
  process.loadEnvFile();
} catch {
  // .env is optional (production provides real environment variables).
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set');
}

const trustedOrigins = (process.env.CSRF_TRUSTED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  app.use(morgan('dev'));
  app.enableCors({
    origin: trustedOrigins.length > 0 ? trustedOrigins : true,
    credentials: true,
  });

  app.enableCsrfProtection({ trustedOrigins });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
await bootstrap();
