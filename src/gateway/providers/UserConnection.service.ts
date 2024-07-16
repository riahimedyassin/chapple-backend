import { Injectable } from '@nestjs/common';

@Injectable()
export class UserConnectionService {
  private readonly connectedUsers: Map<string, string> = new Map();
  /**
   * @description Get the socket ID of the given phone number , otherwise return null.
   * @param {string} phone Phone number
   */
  getSocketID(phone: string) {
    return this.connectedUsers.get(phone);
  }
  /**
   * @description Register a new connection
   * @param {string} phone Phone number
   * @param socketID ID of the socket retrieved from the client
   */
  setConnection(phone: string, socketID: string) {
    this.connectedUsers.set(phone, socketID);
  }
  isConnected(phone: string) {
    return this.connectedUsers.get(phone) != undefined;
  }
  abortConnection(phone: string) {
    this.connectedUsers.delete(phone);
    console.log(this.connectedUsers);
  }
  abortConnectionFromSocketID(socketID: string) {
    for (const [key, value] of this.connectedUsers) {
      if (value == socketID) {
        return this.connectedUsers.delete(key);
      }
    }
  }
}
