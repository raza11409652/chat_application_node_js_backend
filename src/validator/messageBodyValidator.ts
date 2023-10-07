import { NextFunction, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';
import { Message } from '../types/message';

export const validateMessageRequestBody = [
  body('message')
    .isObject()
    .custom((v) => {
      const a: Message = v as Message;
      // console.log(a);
      if (a.type !== 'TEXT') return false;
      if (!a.caption || typeof a.caption !== 'string') return false;
      return true;
    }),
  body('user').isMongoId(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0];
      return res
        .status(400)
        .json({ error: true, details: error, message: error.msg });
    }
    next();
  },
];
export const validateMessageListQuery = [
  query('user').isMongoId(),
  query('skip').isNumeric(),
  // query('size').isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0];
      return res
        .status(400)
        .json({ error: true, details: error, message: error.msg });
    }
    next();
  },
];
