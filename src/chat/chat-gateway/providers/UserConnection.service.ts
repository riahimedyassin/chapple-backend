import { Injectable } from '@nestjs/common';
import { SocketChat } from 'src/chat/common/interfaces/SocketChat.interface';

@Injectable()
export class UserConnectionService {
  private readonly connectedUsers: Map<string, string[]> = new Map();
  getSocketID(phone: string) {
    return this.connectedUsers.get(phone);
  }
  registerConnection(phone: string, socketID: string) {
    if (!this.connectedUsers.get(phone))
      this.connectedUsers.set(phone, [socketID]);
    else this.connectedUsers.set(phone, [...this.getSocketID(phone), socketID]);
  }
  isConnected(phone: string) {
    return this.connectedUsers.get(phone) != undefined;
  }
  dropConnection(phone: string) {
    this.connectedUsers.delete(phone);
  }
  dropConnectionFromSocketID(socketID: string): boolean {
    for (const [key, value] of this.connectedUsers) {
      if (value.includes(socketID)) {
        if (value.length === 1) return this.connectedUsers.delete(key);
        this.connectedUsers.set(
          key,
          value.filter((socket) => socket != socketID),
        );
        return true;
      }
    }
    return false;
  }
}
