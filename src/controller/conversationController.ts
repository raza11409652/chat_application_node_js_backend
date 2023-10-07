import { Response, Request } from 'express';
import { SessionPayload } from '../types/user';
import { MessageBody, NewMessage } from '../types/message';
import { Types } from 'mongoose';
import messageService from '../service/messageService';
import messageEvent from '../event/messageEvent';
class ConversationController {
  async sendMessage(req: Request, res: Response) {
    try {
      const session: SessionPayload = req?.['session'];
      const body: MessageBody = req.body;
      const a: NewMessage = {
        content: body.message,
        sender: new Types.ObjectId(session._id),
        receiver: new Types.ObjectId(body.user),
        participants: [
          new Types.ObjectId(session._id),
          new Types.ObjectId(body.user),
        ],
      };
      const data = await messageService.newMessage(a);
      // Here a message queue implementation should be added to handle failure
      messageEvent.emit('message_send_to_user', data);
      return res.json(data);
    } catch (e) {
      return res
        .status(400)
        .jsonp({ error: true, message: e?.['message'] || 'Api error' });
    }
  }
  async getMessageList(req: Request, res: Response) {
    try {
      const session: SessionPayload = req?.['session'];
      // return res.send('session' + session._id);
      const user = req.query['user'] ? String(req.query['user']) : undefined;
      const skip = req.query['skip'] ? Number(req.query?.['skip']) : 0;
      // if(!isValidObjectId(user)) throw new
      const filter = {
        participants: {
          $all: [new Types.ObjectId(session._id), new Types.ObjectId(user)],
        },
      };
      const response = await messageService.getMessages(filter, skip);

      return res.json(response);
    } catch (e) {
      return res
        .status(400)
        .jsonp({ error: true, message: e?.['message'] || 'Api error' });
    }
  }
}

const conversationController = new ConversationController();
export default conversationController;
