import { JwtGuard } from '@core/auth/guards/JwtGuard.guard';
import { Logger, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
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
  @UseGuards(JwtGuard)
  @SubscribeMessage('message')
  onNewMessage(@MessageBody() body: { content: string }) {
    console.log(body);
    this.server.emit('message', body.content);
  }
}
