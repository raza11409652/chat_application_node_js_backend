export const messageSendToUser = (data: object) => {
  try {
    if (data && typeof data === 'object') {
      const userId = data['receiver']?.['_id'];
      if (userId && global.io) {
        const messagingRoom = `messaging_room:${String(userId)}`;
        global.io.to(messagingRoom).emit(`message_received`, data);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
