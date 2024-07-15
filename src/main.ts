import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaConstraintFilter } from './common/filters/prisma-constraint/prisma-constraint.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/chapple/v1');
  app.useGlobalFilters(new PrismaConstraintFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
