import { User } from '@common/decorators/user/user.decorator';
import { AuthService } from '@core/auth/auth.service';
import { JwtGuard } from '@core/auth/guards/JwtGuard.guard';
import { SocketJwtGuard } from '@core/auth/guards/SocketJwtGuard.guard';
import { RequestUserInterface } from '@interfaces/RequestUser.interface';
import { Logger, OnModuleInit, UseFilters, UseGuards } from '@nestjs/common';
import {
  BaseWsExceptionFilter,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserConnectionService } from './providers/UserConnection.service';

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
  ) {}
  @WebSocketServer()
  server: Server;
  @UseGuards(SocketJwtGuard)
  handleConnection(@ConnectedSocket() client: Socket) {
    const token = client.handshake.headers.authorization.split(' ')[1];
    const payload = this.authService.verfiyToken(token);
    this.userConnectionService.setConnection(payload.phone, client.id);
  }
  @SubscribeMessage('message')
  @UseGuards(SocketJwtGuard)
  onNewMessage(
    @MessageBody() body: { content: string; to: string },
    @ConnectedSocket() client,
  ) {
    // const target = this.userConnectionService.getSocketID(body.to);
    // console.log(target);
    this.server
      .to(this.userConnectionService.getSocketID(client.handshake.user.phone))
      .emit('message', body.content);
  }
}
