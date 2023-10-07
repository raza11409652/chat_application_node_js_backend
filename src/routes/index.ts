import { Router } from 'express';
import authRoutes from './authRoutes';
import conversationRoutes from './conversationRoutes';
import { validateSession } from '../middleware/auth';
import userRoutes from './userRoutes';
const appRoutes = Router();
appRoutes.use('/auth', authRoutes);
appRoutes.use('/conversation', validateSession, conversationRoutes);
appRoutes.use('/users', validateSession, userRoutes);

export default appRoutes;
