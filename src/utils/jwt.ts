// export const
import * as jwt from 'jsonwebtoken';
const PRIVATE_KEY = `MevhcW1uXoMepfBARgce0pDHtHzSprGL_640e846cbf5fea9921329f999864cade05e47b341faf47b24391c97ca5524f9b`;
export const createJwtToken = (p: object, isRefresh?: true | false) => {
  return jwt.sign(p, isRefresh ? `REFRESH_${PRIVATE_KEY}` : PRIVATE_KEY, {
    expiresIn: isRefresh ? '72h' : '24h',
  });
};

export const verifyToken = (token: string, isRefresh?: true | false) => {
  return jwt.verify(token, isRefresh ? `REFRESH_${PRIVATE_KEY}` : PRIVATE_KEY);
};
