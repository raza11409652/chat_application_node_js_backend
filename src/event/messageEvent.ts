import * as event from 'events';
import { messageSendToUser } from './messageEventListener';
const messageEvent = new event.EventEmitter();
messageEvent.addListener('message_send_to_user', messageSendToUser);

export default messageEvent;
