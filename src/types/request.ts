import { Request } from 'express';
import { SessionPayload } from './user';

export class AppRequest extends Request {
  session: SessionPayload | undefined;
}
