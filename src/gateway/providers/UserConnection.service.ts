import { Injectable } from '@nestjs/common';

@Injectable()
export class UserConnectionService {
  private readonly connectedUser: Map<string, string> = new Map();
  /**
   * @description Get the socket ID of the given phone number , otherwise return null.
   * @param {string} phone Phone number
   */
  getSocketID(phone: string) {
    return this.connectedUser.get(phone);
  }
  /**
   * @description Register a new connection
   * @param {string} phone Phone number
   * @param socketID ID of the socket retrieved from the client
   */
  setConnection(phone: string, socketID: string) {
    this.connectedUser.set(phone, socketID);
  }
  isConnected(phone: string) {
    return this.connectedUser.get(phone) != undefined;
  }
  abortConnection(phone: string) {
    this.connectedUser.delete(phone);
  }
}
