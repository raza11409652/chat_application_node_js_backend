import express from 'express';
import { appConfig } from './config/app.config';
import appRoutes from './routes';
import connectToMongoDatabase from './database/mongo';

const app = express();
app.use(express.json());
app.use('/v1/api', appRoutes);
app.listen(appConfig.PORT, () => {
  connectToMongoDatabase((a) => {
    console.log(`Callback response ${a}`);
    if (a !== 0) process.exit(a);
  });
  console.log(`server is started at ${appConfig.PORT}`);
});
