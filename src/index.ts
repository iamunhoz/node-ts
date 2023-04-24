import express from 'express';
import { getPersonRepository } from './database/person';

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
