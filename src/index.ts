import express from 'express';
import { appConfig } from './config/app.config';
import appRoutes from './routes';
import connectToMongoDatabase from './database/mongo';
import { createServer } from 'http';
import cors from 'cors';
import { createSocket } from './websocket';
const app = express();
app.use(express.json());
// Here we need to handle the cors and origin whitelisting
app.use(cors());

const httpServer = createServer(app);
const socketIo = createSocket(httpServer);
global.io = socketIo;
app.use('/v1/api', appRoutes);
httpServer.listen(appConfig.PORT, () => {
  connectToMongoDatabase((a) => {
    if (a !== 0) process.exit(a);
    console.log(`Mongo is connected successfully`);
  });
  console.log(`server is started at ${appConfig.PORT}`);
});
