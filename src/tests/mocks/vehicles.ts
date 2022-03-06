import faker from '@faker-js/faker';
import { ActiveVehicle, Vehicle } from '../../models';

const mockVehicle = (input: Partial<Vehicle>): Partial<Vehicle> => {
  const defaultVehicle = {
    routeId: faker.datatype.number({ min: 1, max: 999 }),
    headsign: faker.random.word(),
    estimatedTime: faker.date.future(),
  };

  return Object.assign(defaultVehicle, input);
};

export const mockVehicles = (input: Partial<Vehicle>[]): Partial<Vehicle>[] => {
  return input.map((vehicle) => mockVehicle(vehicle));
};

const mockActiveVehicle = (input: Partial<ActiveVehicle>): Partial<ActiveVehicle> => {
  const defaultActiveVehicle = {
    routeShortName: faker.random.word(),
    headsign: faker.random.word(),
  };

  return Object.assign(defaultActiveVehicle, input);
};

export const mockActiveVehicles = (input: Partial<ActiveVehicle>[]): Partial<ActiveVehicle>[] => {
  return input.map((vehicle) => mockActiveVehicle(vehicle));
};
