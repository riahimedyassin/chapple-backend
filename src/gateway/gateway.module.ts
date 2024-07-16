import { Logger, Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { AuthModule } from '@core/auth/auth.module';
import { UserConnectionService } from './providers/UserConnection.service';

@Module({
  providers: [MyGateway, UserConnectionService],
  imports: [AuthModule],
})
export class GatewayModule {}
