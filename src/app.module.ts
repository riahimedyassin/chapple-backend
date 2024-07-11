import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { UserModule } from './modules/user/user.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [DatabaseModule, UserModule, GatewayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
