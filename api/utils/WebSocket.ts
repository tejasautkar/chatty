import { Server, Socket } from "socket.io"
import { socketEvents } from "./utilTypes"
export class WebSocket {
    users: { socketId: string, userId: string }[] = [];
    io: Server;
    constructor(io: Server){
        this.io = io;
    }
    connection(client: Socket) {
        client.on(socketEvents.disconnect, () => {
            this.users = this.users.filter((user) => user.socketId !== client.id);
        });

        client.on(socketEvents.identity, (userId) => {
            this.users.push({
                socketId: client.id,
                userId: userId,
            });
        });

        client.on(socketEvents.subscribe, (room: string, otherUserId: string = "") => {
            this.subscribeOtherUser(room, otherUserId);
            client.join(room);
          });
          // mute a chat room
          client.on(socketEvents.unsubscribe, (room: string) => {
            client.leave(room);
          });
        }
      
        subscribeOtherUser(room: string, otherUserId:string) {
          const userSockets = this.users.filter(
            (user) => user.userId === otherUserId
          );
          userSockets.forEach((userInfo) => {
            const socketConn = this.io.sockets.sockets.get(userInfo.socketId);
            if (socketConn) {
              socketConn.join(room);
            }
          });
        }
    
}
