import { Injectable } from '@nestjs/common';
import { SocketChat } from 'src/chat/common/interfaces/SocketChat.interface';

@Injectable()
export class GroupConnectionService implements SocketChat<number> {
  private readonly groupConnected: Map<number, string> = new Map();
  registerConnection(primary: number, socketID: string): void {
    this.groupConnected.set(primary, socketID);
  }
  dropConnection(primary: number): void {
    this.groupConnected.delete(primary);
  }
  isConnected(primary: number): boolean {
    return this.groupConnected.has(primary);
  }
  getSocketID(primary: number): string {
    return this.groupConnected.get(primary);
  }
  dropConnectionFromSocketID(socketID: string): boolean {
    for (const [key, value] of this.groupConnected) {
      if (value == socketID) {
        return this.groupConnected.delete(key);
      }
    }
  }
}
