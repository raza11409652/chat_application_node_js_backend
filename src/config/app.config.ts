import * as dotenv from 'dotenv';
dotenv.config();
export const appConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'STAGING',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
  mongo: {
    username: process.env.MONGO_DB_USER_NAME || '',
    password: process.env.MONGO_DB_PASSWORD || '',
    host: process.env.MONGO_DB_HOST || 'localhost',
    port: process.env.MONGO_DB_PORT || 27017,
    connectionUrl: process.env.MONGO_DB_CONNECTION_URL || '',
    databaseName: process.env.MONGO_DB_NAME || 'live_chat_application',
  },
};
