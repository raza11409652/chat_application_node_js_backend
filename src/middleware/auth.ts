import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
export const validateSession = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // JWT token should be present in header part
    const token = req.headers.authorization || req.headers?.['Authorization'];
    if (!token) throw new Error('Token is required');
    // token should be a Bearer  token
    const headerSplit = token.toString().split(' ');
    if (headerSplit.length !== 2) throw new Error('Invalid request');
    if (headerSplit[0].toLowerCase() !== 'bearer')
      throw new Error('Invalid token type');
    const payload = verifyToken(headerSplit[1]);
    req['session'] = payload;
    next();
  } catch (e) {
    return res
      .status(401)
      .jsonp({ error: true, message: e?.['message'] || 'Auth failed' });
  }
};
