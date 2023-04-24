import express from 'express';
import os from 'os';
import { startRedisServer } from './database';

const app = express();
const host: { ip: string; port: number } =
  os.hostname() === 'krafter' ?
  { ip: '127.0.1', port: 3000 } :
  { ip: '0.0.0.0', port: process.env.PORT };

const redisController = startRedisServer();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/add-new-value/', async (req, res) => {
  await redisController.connect();

  await redisController.set(req.query.key as string, req.query.value as string)

  const value = await redisController.get(req.query.key as string)
  res.send(`new value created in db: ${value}`)
})

app.listen(host.port, host.ip, () => {
  console.log(`Server listening on port ${host.port}`);
});
