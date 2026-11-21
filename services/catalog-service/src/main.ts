import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import cookieParser from 'cookie-parser';
try {
  process.loadEnvFile();
} catch {
  // .env не обязателен: в продакшене переменные приходят из окружения.
}
const trustedOrigins = (process.env.CSRF_TRUSTED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  // });
  app.enableCors({
    origin: trustedOrigins.length > 0 ? trustedOrigins : true,
    credentials: true,
  });

  app.enableCsrfProtection({ trustedOrigins });
  await app.listen(process.env.PORT ?? 3101);
}
await bootstrap();
