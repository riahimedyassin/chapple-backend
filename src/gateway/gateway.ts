import { User } from '@common/decorators/user/user.decorator';
import { AuthService } from '@core/auth/auth.service';
import { JwtGuard } from '@core/auth/guards/JwtGuard.guard';
import { SocketJwtGuard } from '@core/auth/guards/SocketJwtGuard.guard';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserConnectionService } from './providers';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageModel } from '@common/models';
import { SocketAuth } from '@interfaces/index';

@WebSocketGateway(3001, {
  namespace: 'chat',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
export class MyGateway implements OnGatewayConnection {
  constructor(
    private readonly authService: AuthService,
    private readonly userConnectionService: UserConnectionService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    const payload = this.authService.extractTokenFromSocket(client);
    if (!payload) return client.disconnect(true);
    this.userConnectionService.setConnection(payload.phone, client.id);
  }
  
  @SubscribeMessage('message')
  @UseGuards(SocketJwtGuard)
  onNewMessage(
    @MessageBody(ValidationPipe) body: MessageModel,
    @ConnectedSocket() client: SocketAuth,
  ) {
    this.server
      .to(this.userConnectionService.getSocketID(body.to))
      .emit('message', body.content);
  }
}
