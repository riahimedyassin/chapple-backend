import { AuthService } from '@core/auth/auth.service';
import { SocketJwtGuard } from '@core/auth/guards/SocketJwtGuard.guard';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserConnectionService } from './providers';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageModel } from '@common/models';
import { SocketAuth } from '@interfaces/index';
import { createMessageDto } from '@modules/message/dto';

@WebSocketGateway(3001, {
  namespace: 'chat',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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
  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const payload = await this.authService.extractTokenFromSocket(client);
      if (!payload) return client.disconnect(true);
      this.userConnectionService.registerConnection(payload.email, client.id);
    } catch (error) {
      return client.disconnect(true);
    }
  }
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.userConnectionService.dropConnectionFromSocketID(client.id);
  }

  @SubscribeMessage('message')
  @UseGuards(SocketJwtGuard)
  onNewMessage(
    @MessageBody(ValidationPipe) { content, to }: MessageModel<string>,
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
