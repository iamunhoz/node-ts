import { createClient } from 'redis';

const { REDISUSER, REDISPASSWORD, REDISHOST, REDISPORT } = process.env

const REDIS_RAILWAIL_SERVER_URL = `redis://${REDISUSER}:${REDISPASSWORD}@${REDISHOST}:${REDISPORT}`

export const startRedisServer = async (): Promise<void> => {
  const client = createClient({
    //redis[s]://[[username][:password]@][host][:port][/db-number]
    url: REDIS_RAILWAIL_SERVER_URL//'redis://localhost:6379',
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  // await client.set('first_object', { chaveUm: 777 });
  const pattern = '*';
  const serverKeys = await client.keys(pattern);

  console.log('serverKeys', serverKeys);
};

