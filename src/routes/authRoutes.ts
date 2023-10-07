import { Router } from 'express';
import { authController } from '../controller';
import {
  validateUserCreation,
  validateLoginRequestBody,
} from '../validator/userValidator';
const authRoutes = Router();

// Login auth router
// It will accept username and password as required argument
// email passed should be a valid email Id
authRoutes.post('/login', validateLoginRequestBody, authController.login);
// Refresh session token  will accept refresh token [Validate] and regenerate a
// new session token which can be used to access other session
// If refresh token has also been expired in that case a new login is required
authRoutes.post('/refresh', authController.refreshLoginSession);
// Register user end point this will allow user to register using username , name and password
// with basic details and will return a new session to continue with the application
authRoutes.post('/register', validateUserCreation, authController.register);
export default authRoutes;
