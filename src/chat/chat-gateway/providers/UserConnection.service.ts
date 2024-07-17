import { Injectable } from '@nestjs/common';
import { SocketChat } from 'src/chat/common/interfaces/SocketChat.interface';

@Injectable()
export class UserConnectionService implements SocketChat<string> {
  private readonly connectedUsers: Map<string, string> = new Map();
  getSocketID(phone: string) {
    return this.connectedUsers.get(phone);
  }
  registerConnection(phone: string, socketID: string) {
    this.connectedUsers.set(phone, socketID);
  }
  isConnected(phone: string) {
    return this.connectedUsers.get(phone) != undefined;
  }
  dropConnection(phone: string) {
    this.connectedUsers.delete(phone);
  }
  dropConnectionFromSocketID(socketID: string) : boolean {
    for (const [key, value] of this.connectedUsers) {
      if (value == socketID) {
        return this.connectedUsers.delete(key);
      }
    }
  }
}
