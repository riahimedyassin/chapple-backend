import { Injectable, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { GroupConnectionService } from './providers/GroupConnection.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Socket } from 'socket.io';
import { SocketJwtGuard } from '@core/auth/guards/SocketJwtGuard.guard';
import { SocketAuth } from '@interfaces/SocketAuth';
import { MessageModel } from '@common/models';

@WebSocketGateway(3002, {
  namespace: 'group',
  cors: {
    origin: '*',
  },
})
export class GroupChatGateway {
  @WebSocketServer()
  server: Socket;
  constructor(
    private readonly groupConnectionService: GroupConnectionService,
    // private readonly eventEmitter: EventEmitter2,
  ) {}

  @SubscribeMessage('join.group')
  @UseGuards(SocketJwtGuard)
  async handleJoinRoom(
    @ConnectedSocket() client: SocketAuth,
    @MessageBody() payload: { group: number },
  ) {
    if (!this.groupConnectionService.isConnected(payload.group))
      this.groupConnectionService.registerConnection(payload.group);
    const isAllowed = await this.groupConnectionService.isAllowed(
      payload.group,
      client,
    );
    if (!isAllowed) return client.emit('error', 'Forbidden');
    client.join(payload.group.toString());
  }

  @SubscribeMessage('message')
  @UseGuards(SocketJwtGuard)
  onMessage(
    @ConnectedSocket() client: SocketAuth,
    @MessageBody() { to, content }: MessageModel<number>,
  ) {
    if (!this.groupConnectionService.isConnected(to))
      this.groupConnectionService.registerConnection(to);
    if (this.groupConnectionService.isAllowed(to, client)) {
      this.server.to(to.toString()).emit('message', {
        content: content,
        from: client.handshake.user.email,
      });
    } else client.emit('error', 'Forbidden');
  }
}
