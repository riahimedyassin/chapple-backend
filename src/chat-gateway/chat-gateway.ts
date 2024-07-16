import { User } from '@common/decorators/user/user.decorator';
import { AuthService } from '@core/auth/auth.service';
import { JwtGuard } from '@core/auth/guards/JwtGuard.guard';
import { SocketJwtGuard } from '@core/auth/guards/SocketJwtGuard.guard';
import { UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserConnectionService } from './providers';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { MessageModel } from '@common/models';
import { SocketAuth } from '@interfaces/index';
import { createMessageDto } from '@modules/message/dto';
import { SocketAuthFilter } from '@common/filters/socket-auth/socket-auth.filter';

@WebSocketGateway(3001, {
  namespace: 'chat',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    private readonly userConnectionService: UserConnectionService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const payload = this.authService.extractTokenFromSocket(client);
      if (!payload) return client.disconnect(true);
      this.userConnectionService.setConnection(payload.email, client.id);
    } catch (error) {
      return client.disconnect(true);
    }
  }
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.userConnectionService.abortConnectionFromSocketID(client.id);
  }

  @SubscribeMessage('message')
  @UseGuards(SocketJwtGuard)
  onNewMessage(
    @MessageBody(ValidationPipe) { content, to }: MessageModel,
    @ConnectedSocket() client: SocketAuth,
  ) {
    const { email } = client.handshake.user;
    const target = this.userConnectionService.getSocketID(to);
    if (target) {
      this.server.to(target).emit('message', {
        from: email,
        content: content,
      });
    }
    this.eventEmitter.emit(
      'message.create',
      new createMessageDto(to, content, email),
    );
  }
}
