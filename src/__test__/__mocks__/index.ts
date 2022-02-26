import faker from '@faker-js/faker';
import * as Models from '../../models/models.interface';

export const mockStop = (): Partial<Models.Stop> => {
  return {
    stopId: faker.datatype.number({ min: 1000, max: 9999 }),
    stopName: faker.random.word(),
    stopDesc: faker.random.word(),
    stopLon: faker.datatype.float({ min: 1, max: 100 }),
    stopLat: faker.datatype.float({ min: 1, max: 100 }),
  };
};
