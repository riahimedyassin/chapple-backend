import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaConstraintFilter } from './common/filters/prisma-constraint/prisma-constraint.filter';
import { ValidationPipe } from '@nestjs/common';
import { SocketAuthFilter } from '@common/filters/socket-auth/socket-auth.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/chapple/v1');
  app.useGlobalFilters(new PrismaConstraintFilter(), new SocketAuthFilter());
  app.enableCors({
    origin : "*"
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
}

bootstrap();
