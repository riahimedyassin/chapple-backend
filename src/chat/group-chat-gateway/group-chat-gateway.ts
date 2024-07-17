import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { GroupConnectionService } from './providers/GroupConnection.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Socket } from 'socket.io';

@WebSocketGateway(3002, {
  namespace: 'group',
  cors: {
    origin: '*',
  },
  
})
export class GroupChatGateway {
  constructor(
    private readonly groupConnectionService: GroupConnectionService,
    // private readonly eventEmitter: EventEmitter2,
  ) {}

  @SubscribeMessage('message')
  onMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {}
}
