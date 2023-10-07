import mongoose from 'mongoose';
import { appConfig } from '../config/app.config';

const isSrvConnectionURL = appConfig.mongo.connectionUrl !== undefined;
// console.log(isSrvConnectionURL);
const mongoUrl = isSrvConnectionURL
  ? `${appConfig.mongo.connectionUrl}${appConfig.mongo.databaseName}`
  : `mongodb://${appConfig.mongo.username}:${appConfig.mongo.password}@${appConfig.mongo.host}:${appConfig.mongo.port}/${appConfig.mongo.databaseName}?authSource=admin`;
const connectToMongoDatabase = (callback: (e: number) => void) => {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      callback(0);
    })
    .catch((err) => {
      console.log(err);
      callback(100);
    });
  mongoose.Promise = global.Promise;
};

export default connectToMongoDatabase;
