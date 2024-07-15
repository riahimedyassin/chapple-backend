import { JwtGuard } from '@core/auth/guards/JwtGuard.guard';
import { SocketJwtGuard } from '@core/auth/guards/SocketJwtGuard.guard';
import { Logger, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

@WebSocketGateway(3001, {
  namespace: 'chat',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  onModuleInit() {}
  @SubscribeMessage('message')
  @UseGuards(SocketJwtGuard)
  onNewMessage(
    @MessageBody() body: { content: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(body);
    this.server.emit('message', body.content);
  }
}
