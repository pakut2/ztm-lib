import faker from '@faker-js/faker';
import axios from 'axios';
import { activeVehicles, vehiclesForStop, vehiclesForStops } from '../index';
import { mockActiveVehicles, mockVehicles } from './mocks';

describe('vehicles', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('vehiclesForStop', () => {
    it('should return all vehicles when no params are provided', async () => {
      const mockedVehicles = mockVehicles([{}, {}]);
      jest.spyOn(axios, 'get').mockResolvedValue({ data: { departures: mockedVehicles } });

      const result = await vehiclesForStop(1462);

      expect(result).toMatchObject(mockedVehicles);
      expect(result).toHaveLength(2);
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
      expect(result).toHaveLength(1);
    });
  });

  describe('vehiclesForStops', () => {
    it('should return all vehicles for all stops when no params are provided', async () => {
      const mockedVehicles = mockVehicles([{}, {}]);
      jest
        .spyOn(axios, 'get')
        .mockImplementationOnce(() => Promise.resolve({ data: { departures: mockedVehicles } }))
        .mockImplementationOnce(() => Promise.resolve({ data: { departures: mockedVehicles } }));

      const result = await vehiclesForStops([1461, 1462]);

      expect(result).toMatchObject([{ '1461': mockedVehicles }, { '1462': mockedVehicles }]);
    });

    it('should return only the vehicles specified by params for all stops', async () => {
      const input = { headsign: faker.random.word() };
      const mockedVehicles = mockVehicles([
        { headsign: input.headsign },
        { headsign: faker.random.word() },
        {},
      ]);
      jest
        .spyOn(axios, 'get')
        .mockImplementationOnce(() => Promise.resolve({ data: { departures: mockedVehicles } }))
        .mockImplementationOnce(() => Promise.resolve({ data: { departures: mockedVehicles } }));

      const result = await vehiclesForStops([1461, 1462], input);

      expect(result).toMatchObject([
        { '1461': [mockedVehicles[0]] },
        { '1462': [mockedVehicles[0]] },
      ]);
    });
  });

  describe('nearVehicles', () => {
    it('should return all vehicles when no params are provided', async () => {
      const mockedVehicles = mockActiveVehicles([{}, {}]);
      jest.spyOn(axios, 'get').mockResolvedValue({ data: { vehicles: mockedVehicles } });

      const result = await activeVehicles();

      expect(result).toMatchObject(mockedVehicles);
      expect(result).toHaveLength(2);
    });

    it('should return only the vehicles specified by params', async () => {
      const input = { headsign: faker.random.word() };
      const mockedVehicles = mockActiveVehicles([
        { headsign: input.headsign },
        { headsign: faker.random.word() },
        {},
      ]);
      jest.spyOn(axios, 'get').mockResolvedValue({ data: { vehicles: mockedVehicles } });

      const result = await activeVehicles(input);

      expect(result).toMatchObject([mockedVehicles[0]]);
      expect(result).toHaveLength(1);
    });
  });
});
