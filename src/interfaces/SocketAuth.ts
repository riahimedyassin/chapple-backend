import { Socket } from 'socket.io';
import { RequestUserInterface } from './RequestUser.interface';

export interface SocketAuth extends Socket {
  handshake: Socket['handshake'] & {
    user: RequestUserInterface;
  };
}
