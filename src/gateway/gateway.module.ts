import { Logger, Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { AuthModule } from '@core/auth/auth.module';

@Module({
  providers: [MyGateway],
  imports: [AuthModule],
})
export class GatewayModule {}
