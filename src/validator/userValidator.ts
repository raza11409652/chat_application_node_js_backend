import { NextFunction, Response, Request } from 'express';
import { body, validationResult } from 'express-validator';

export const validateUserCreation = [
  body('name').optional().isString(),
  body('username').isString(),
  body('password').isStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
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
export const validateLoginRequestBody = [
  body('username').isString(),
  body('password').isString(),
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
