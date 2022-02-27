import faker from '@faker-js/faker';
import * as Models from '../../models/models.interface';

export const mockStop = (input: Partial<Models.Stop>): Partial<Models.Stop> => {
  const defaultStop = {
    stopId: faker.datatype.number({ min: 1000, max: 9999 }),
    stopName: faker.random.word(),
    stopDesc: faker.random.word(),
    stopLon: faker.datatype.float({ min: 1, max: 100 }),
    stopLat: faker.datatype.float({ min: 1, max: 100 }),
  };

  return Object.assign(defaultStop, input);
};

export const mockStops = (input: Array<Partial<Models.Stop>>): Array<Partial<Models.Stop>> => {
  const stops: Array<Partial<Models.Stop>> = [];

  input.forEach((stop) => {
    stops.push(mockStop(stop));
  });

  return stops;
};
