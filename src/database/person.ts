//person.js file

import { Entity, Repository, Schema } from 'redis-om';
import getRedisClient from './client';

class Person extends Entity {}

const personSchema = new Schema(Person, {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  age: { type: 'number' },
  verified: { type: 'boolean' },
  location: { type: 'point' },
  locationUpdated: { type: 'date' },
  skills: { type: 'string[]' },
  personalStatement: { type: 'text' },
});

export const getPersonRepository = async (): Promise<Repository<Person>> => {
  const client = await getRedisClient();
  const personRepository = client.fetchRepository(personSchema);
  await personRepository.createIndex();

  return personRepository;
};
