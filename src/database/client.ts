//client.js file

import { Client } from 'redis-om';

// pulls the Redis URL from .env
const url = process.env.REDIS_URL;

const getRedisClient = async (): Promise<Client> => {
  const client = new Client();
  await client.open(url);

  return client;
};

export default getRedisClient;
