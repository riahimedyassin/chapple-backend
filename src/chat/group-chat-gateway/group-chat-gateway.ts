import { Body, Injectable, Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
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
import { AuthService } from '@core/auth/auth.service';

@WebSocketGateway(3002, {
  namespace: 'group',
  cors: {
    origin: '*',
  },
})
export class GroupChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Socket;
  constructor(
    private readonly groupConnectionService: GroupConnectionService,
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const payload = await this.authService.verfiyToken(client);
      if (!payload) return client.disconnect(true);
    } catch (error) {
      return client.disconnect(true);
    }
  }
  @SubscribeMessage('join')
  @UseGuards(SocketJwtGuard)
  async handleJoinRoom(
    @ConnectedSocket() client: SocketAuth,
    @MessageBody() { group }: { group: number },
  ) {
    if (!group) return client.emit('error', 'Provide the group chat id');
    if (!this.groupConnectionService.isConnected(group))
      this.groupConnectionService.registerConnection(group);
    const isAllowed = await this.groupConnectionService.isAllowed(
      group,
      client,
    );
    if (!isAllowed) return client.emit('error', 'Forbidden');
    // await this.groupConnectionService.unregisterUser(client.id);
    await client.join(`group:${group}`);
  }

  @SubscribeMessage('message')
  @UseGuards(SocketJwtGuard)
  async onMessage(
    @ConnectedSocket() client: SocketAuth,
    @MessageBody() { to, content }: MessageModel<number>,
  ) {
    if (!this.groupConnectionService.isConnected(to))
      this.groupConnectionService.registerConnection(to);
    if (!(await this.groupConnectionService.isAllowed(to, client)))
      return client.emit('error', 'Forbidden');
    const from = client.handshake.user.email;
    this.server.to(`group:${to}`).emit(`group:${to}:message`, {
      content: content,
      from: from,
    });
    this.eventEmitter.emit('group.message', {
      group: to,
      sent_by: from,
      content,
    });
  }
  @SubscribeMessage('leave')
  @UseGuards(SocketJwtGuard)
  async handleLeave(
    @MessageBody() payload: { group: number },
    @ConnectedSocket() socket: SocketAuth,
  ) {
    await socket.leave(`group:${payload.group}`);
    return this.groupConnectionService.dropConnectionFromSocketID(
      payload.group,
      socket.id,
    );
  }

  handleDisconnect(
    @ConnectedSocket()
    client: SocketAuth,
  ) {
    this.groupConnectionService.unregisterUser(client.id);
  }
}
