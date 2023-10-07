export type NewUser = {
  username: string;
  password: string;
  name?: string;
};
export type SessionPayload = {
  _id: string;
  username: string;
  sessionId: string;
  isRefreshToken: boolean;
};

export type UserLogin = {
  username: string;
  password: string;
};
