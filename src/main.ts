import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaConstraintFilter } from './common/filters/prisma-constraint/prisma-constraint.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaConstraintFilter());
  await app.listen(3000);
}
bootstrap();
