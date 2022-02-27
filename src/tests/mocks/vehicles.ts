import faker from '@faker-js/faker';
import { Vehicle } from '../../models';

const mockVehicle = (input: Partial<Vehicle>): Partial<Vehicle> => {
  const defaultVehicle = {
    routeId: faker.datatype.number({ min: 1, max: 999 }),
    headsign: faker.random.word(),
    estimatedTime: faker.date.future(),
  };

  return Object.assign(defaultVehicle, input);
};

export const mockVehicles = (input: Array<Partial<Vehicle>>): Array<Partial<Vehicle>> => {
  return input.map((vehicle) => mockVehicle(vehicle));
};
