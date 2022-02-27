import faker from '@faker-js/faker';
import axios from 'axios';
import { vehiclesForStop } from '../index';
import { mockVehicles } from './mocks';

describe('vehicles', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all vehicles when no params are provided', async () => {
    const mockedVehicles = mockVehicles([
      { headsign: faker.random.word() },
      { headsign: faker.random.word() },
    ]);
    jest.spyOn(axios, 'get').mockResolvedValue({ data: { departures: mockedVehicles } });

    const result = await vehiclesForStop(1462);

    expect(result).toMatchObject(mockedVehicles);
  });

  it('should return only the vehicles specified by params', async () => {
    const input = { headsign: faker.random.word() };
    const mockedVehicles = mockVehicles([
      { headsign: input.headsign },
      { headsign: faker.random.word() },
      {},
    ]);
    jest.spyOn(axios, 'get').mockResolvedValue({ data: { departures: mockedVehicles } });

    const result = await vehiclesForStop(1462, input);

    expect(result).toMatchObject([mockedVehicles[0]]);
  });
});
