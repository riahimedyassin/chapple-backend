import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  WsExceptionFilter,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException)
export class BadRequestWsFilter<T> implements WsExceptionFilter<WsException> {
  catch(exception: WsException, host: ArgumentsHost) {
    const client: Socket = host.switchToWs().getClient();
    return client.emit('error', exception.message);
  }
}
