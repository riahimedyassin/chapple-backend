import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { UserModule } from './modules/user/user.module';
import { GatewayModule } from './gateway/gateway.module';
import { MessageModule } from './modules/message/message.module';
import { BcryptModule } from './common/modules/Bcrypt/Bcrypt.module';
import { LoggerModule } from '@core/logger/Logger.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    GatewayModule,
    MessageModule,
    BcryptModule,
    LoggerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
