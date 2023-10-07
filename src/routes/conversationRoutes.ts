import { Router } from 'express';
import { conversationController } from '../controller';
import {
  validateMessageRequestBody,
  validateMessageListQuery,
} from '../validator/messageBodyValidator';

const conversationRoutes = Router();

conversationRoutes.post(
  '/',
  validateMessageRequestBody,
  conversationController.sendMessage,
);
conversationRoutes.get(
  '/',
  validateMessageListQuery,
  conversationController.getMessageList,
);

export default conversationRoutes;
