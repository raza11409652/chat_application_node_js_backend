import userService from '../service/userService';
import { Request, Response } from 'express';
import { SessionPayload } from '../types/user';
import { getPagination, getPaginationData } from '../utils/pagination';
export class UserController {
  // constructor(private ){}
  async getUserList(req: Request, res: Response) {
    try {
      const page = req.query['page'] || 1;
      const { limit, skip } = getPagination(Number(page), 20);
      const session: SessionPayload = req?.['session'];
      if (!session) throw new Error('Invalid request');
      const filter = { _id: { $ne: session._id } };
      const { records, count } = await userService.getUsers(
        filter,
        skip,
        limit,
      );
      const response = getPaginationData(count, Number(page), limit, records);
      return res.jsonp(response);
    } catch (e) {
      return res
        .status(400)
        .jsonp({ error: false, message: e?.['message'] || 'Api error' });
    }
  }
}

const userController = new UserController();
export default userController;
