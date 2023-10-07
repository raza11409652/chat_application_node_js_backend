import { compareSync, genSaltSync, hashSync } from 'bcrypt';
const SALT_ROUND = 10;
export const createBcryptHash = (t: string) => {
  const salt = genSaltSync(SALT_ROUND);
  return hashSync(t, salt);
};

export const compareBcryptHash = (hash: string, text: string) => {
  return compareSync(text, hash);
};
