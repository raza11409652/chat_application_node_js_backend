import { Server, Socket } from 'socket.io';
import { verifyToken } from '../utils/jwt';
const messagingRoom = `messaging_room`;
export const createSocket = (http) => {
  const io = new Server(http, { transports: ['websocket'] });

  io.on('connection', (socket: Socket) => {
    //Here we are expecting the session token
    // with bearer so will validate the token an than only will
    // allow user to connect to socket and join a room
    // so that they can listen to that specific room event only
    // console.log(socket.handshake);
    const authorization = socket.handshake.auth.token;
    if (!authorization) socket.disconnect(true);
    try {
      // console.log({ authorization });
      const payload = verifyToken(authorization);
      const id = payload?.['_id'];
      if (id) {
        socket.join(`${messagingRoom}:${id}`);
      }
    } catch (e) {
      // console.log('Error', e);
      socket.disconnect(true);
    }
  });
  return io;
};
