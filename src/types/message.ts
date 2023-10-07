import { Types } from 'mongoose';

export type MessageType = 'TEXT';
//v1 - only supported type is text
//Media messages can have meta data
export type ImageType = {
  url: string;
  fileName?: string;
};
export type Message = {
  type: MessageType;
  caption: string;
  //   image?: ImageType;
};

export type MessageBody = {
  message: Message;
  user: string;
};
export type NewMessage = {
  content: Message;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  participants: Array<Types.ObjectId>;
};
