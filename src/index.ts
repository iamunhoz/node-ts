import express from 'express';
import os from 'os';
import { getPersonRepository } from './database/person';

const app = express();
const host: { ip: string; port: number } =
  os.hostname() === 'krafter' ?
  { ip: '127.0.1', port: 3000 } :
  { ip: '0.0.0.0', port: process.env.PORT };

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/check-status', (_, res) => {
  res.send('server is on');
});

app.get('/create-user', async (req, res) => {
  const personRepository = await getPersonRepository();

  const input = {
    firstName: 'Rupert',
    lastName: 'Holmes',
    age: 75,
    verified: false,
    location: {
      longitude: 45.678,
      latitude: 45.678,
    },
    locationUpdated: '2022-03-01T12:34:56.123Z',
    skills: ['singing', 'songwriting', 'playwriting'],
    personalStatement: 'I like piña coladas and walks in the rain',
  };

  const person = await personRepository.createAndSave(input);
  const id = person.entityId;
  const fetchedPerson = await personRepository.fetch(id);

  res.send({ fetchedPerson });
});

app.listen(host.port, host.ip, () => {
  console.log(`Server listening on port ${host.port}`);
});
