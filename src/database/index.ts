/* import { createClient } from 'redis';

export const startRedisServer = async (): Promise<void> => {
  const client = createClient({
    //redis[s]://[[username][:password]@][host][:port][/db-number]
    url: 'redis://localhost:6379',
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('first_object', { chaveUm: 'teste' });

  const pattern = '*';
  const serverKeys = await client.keys(pattern);

  console.log('serverKeys', serverKeys);
};
 */

export {}