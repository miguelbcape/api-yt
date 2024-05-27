import mongoose from 'mongoose';
import { createClient } from 'redis';
import { URL_REDIS, URL_MONGO } from './config.js';

// connection redis database
export const connectRedis = async () => {
  const client = createClient({
    url: URL_REDIS,
  });
  client.on('error', (err) => console.log(err));
  await client.connect();
  return client;
};

// connection mongo database
export const connectMongo = async () => {
  try {
    await mongoose.connect(
      URL_MONGO
    );
  } catch (error) {
    console.log(error);
  }
};
