export interface SocketChat<T> {
  /**
   * @description Get the socket ID of the given phone number , otherwise return null.
   * @param {string} primary Primary key to identify the connection
   */
  getSocketID(primary: T): string;
  /**
   * @description Register a new connection
   * @param {T} primary Primary key to identify the connection
   * @param socketID ID of the socket retrieved from the client
   */
  registerConnection(primary: T, socketID: string): void;
  /**
   * @description Check if the user/room is registered and have a previous connection with the socket.
   * @param primary
   */
  isConnected(primary: T): boolean;
  /**
   * @description Drop connection from the socket registery
   * @param primary
   */
  dropConnection(primary: T): void;
  /**
   * @description Drop connection from the socket registery using the socketID to identify it.
   * @param socketID Socket ID of the registered connection
   */
  dropConnectionFromSocketID(socketID: string): boolean;
}
