import user from '../schema/user';
import { NewUser } from '../types/user';
class UserService {
  async newUser(u: NewUser) {
    const x = new user(u);
    return await x.save();
  }

  async getUserByUsername(username: string) {
    return await user.findOne({ username }).lean();
  }
  async getUsers(filter: object, skip: number, limit: number) {
    const c = user.count(filter);
    const r = user
      .find(filter, { password: 0 })
      .limit(limit)
      .skip(skip)
      .lean()
      .allowDiskUse(true)
      .sort({ username: 1 });
    const [count, records] = await Promise.all([c, r]);
    return { count, records };
    // return await
  }
}

const userService = new UserService();
export default userService;
