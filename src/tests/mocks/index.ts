import faker from '@faker-js/faker';
import * as Models from '../../models/models.interface';

const mockStop = (input: Partial<Models.Stop>): Partial<Models.Stop> => {
  const defaultStop = {
    stopId: faker.datatype.number({ min: 1000, max: 9999 }),
    stopName: faker.random.word(),
    stopDesc: faker.random.word(),
    stopLon: faker.datatype.float({ min: 1, max: 90 }),
    stopLat: faker.datatype.float({ min: 1, max: 90 }),
  };

  return Object.assign(defaultStop, input);
};

export const mockStops = (input: Array<Partial<Models.Stop>>): Array<Partial<Models.Stop>> => {
  return input.map((stop) => mockStop(stop));
};
