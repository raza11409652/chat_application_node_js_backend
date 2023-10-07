import { NextFunction, Request, Response } from 'express';
import { NewUser, SessionPayload, UserLogin } from '../types/user';
import userService from '../service/userService';
import { compareBcryptHash, createBcryptHash } from '../utils/bcrypt';
import { getUUID } from '../utils/uuid';
import { createJwtToken } from '../utils/jwt';
import { getAvatarColor } from '../utils/avatar';
// userService
class AuthController {
  async login(req: Request, res: Response) {
    try {
      const body: UserLogin = req.body;
      const data = await userService.getUserByUsername(body.username);
      if (!data) throw new Error('Auth failed');
      const flag = compareBcryptHash(data.password, body.password);
      if (!flag) throw new Error('Auth failed username and password mismatch');
      const sessionId = getUUID();
      const p: SessionPayload = {
        _id: String(data._id),
        username: data.username || '',
        isRefreshToken: false,
        sessionId,
      };
      const tokenSession = createJwtToken(p, p.isRefreshToken);
      const tokenRefresh = createJwtToken({ ...p }, true);

      return res.json({
        session: { token: tokenSession, refresh: tokenRefresh },
        user: { ...data, password: undefined },
        // !!notes password need to be removed from response
        // !! TODO here we should use type with partial
      });
    } catch (e) {
      return res
        .status(400)
        .jsonp({ error: true, message: e?.['message'] || 'Api failed' });
    }
  }
  async register(req: Request, res: Response) {
    try {
      const b: NewUser = req.body;
      //step 1 check is username is already used ?
      const data = await userService.getUserByUsername(b.username);
      if (data) throw new Error('Username is already used');
      b.password = createBcryptHash(b.password);
      const user = (
        await userService.newUser({ ...b, avatarBackground: getAvatarColor() })
      ).toObject();
      // JWT Token generation
      const sessionId = getUUID();
      const p: SessionPayload = {
        _id: String(user._id),
        username: user.username || '',
        isRefreshToken: false,
        sessionId,
      };
      const tokenSession = createJwtToken(p, p.isRefreshToken);
      const tokenRefresh = createJwtToken({ ...p }, true);

      return res.json({
        session: { token: tokenSession, refresh: tokenRefresh },
        user: { ...user, password: undefined },
        // !!notes password need to be removed from response
        // !! TODO here we should use type with partial
      });
    } catch (e) {
      return res.status(400).jsonp({ error: true, message: e?.['message'] });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async refreshLoginSession(req: Request, res: Response, next: NextFunction) {}
}

const authController = new AuthController();
export default authController;
