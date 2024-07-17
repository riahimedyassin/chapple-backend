import { SocketAuth } from '@interfaces/SocketAuth';
import { UserGroupService } from '@modules/group/providers/user-group.service';
import { Injectable } from '@nestjs/common';
import { SocketChat } from 'src/chat/common/interfaces/SocketChat.interface';

@Injectable()
export class GroupConnectionService {
  constructor(private readonly userGroupService: UserGroupService) {}
  private readonly groupConnected: Set<number> = new Set();
  private readonly cachedAllowedAcces: Map<number, string[]> = new Map();
  registerConnection(primary: number): void {
    this.groupConnected.add(primary);
    this.cachedAllowedAcces.set(primary, []);
  }
  dropConnection(primary: number): void {
    this.groupConnected.delete(primary);
  }
  isConnected(primary: number): boolean {
    return this.groupConnected.has(primary);
  }
  dropConnectionFromSocketID(socketID: string): boolean {
    return;
  }
  async isAllowed(groupID: number, socket: SocketAuth) {
    if (this.cachedAllowedAcces.get(groupID).includes(socket.id)) return true;
    const allowed = await this.userGroupService.isMember(
      groupID.toString(),
      socket.handshake.user.email,
    );
    if (allowed) return this.registerCache(groupID, socket);
    return false;
  }

  private registerCache(groupID: number, socket: SocketAuth) {
    this.cachedAllowedAcces.set(groupID, [
      ...this.cachedAllowedAcces.get(groupID),
      socket.id,
    ]);
    return true;
  }
}
