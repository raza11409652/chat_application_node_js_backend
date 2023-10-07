import message from '../schema/message';
import { NewMessage } from '../types/message';
const populateArray = ['username', 'avatarBackground', 'profileImage'];
class MessageService {
  /**
   * Save a message to database
   * @param a
   * @returns
   */
  async newMessage(a: NewMessage) {
    const ab = new message(a);
    return (await (await ab.save()).populate('sender', populateArray)).populate(
      'receiver',
      populateArray,
    );
  }

  async getMessages(f: object) {
    return await message
      .find(f)
      .sort({ createdAt: -1 })
      .populate('sender', populateArray)
      .populate('receiver', populateArray)
      .allowDiskUse(true)
      .lean();
  }
}

const messageService = new MessageService();
export default messageService;
