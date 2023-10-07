import userService from '../service/userService';
import { Request, Response } from 'express';
import { SessionPayload } from '../types/user';
export class UserController {
  // constructor(private ){}
  async getUserList(req: Request, res: Response) {
    try {
      const session: SessionPayload = req?.['session'];
      if (!session) throw new Error('Invalid request');
      const filter = { _id: { $ne: session._id } };
      const { records, count } = await userService.getUsers(filter, 0, 0);
      return res.jsonp({ records, count });
    } catch (e) {
      return res
        .status(400)
        .jsonp({ error: false, message: e?.['message'] || 'Api error' });
    }
  }
}

const userController = new UserController();
export default userController;
