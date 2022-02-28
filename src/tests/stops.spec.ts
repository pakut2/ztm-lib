import faker from '@faker-js/faker';
import axios from 'axios';
import { stops, vehiclesForStop } from '../index';
import { vehiclesForStops } from '../stops';
import { mockStops, mockVehicles } from './mocks';

describe('stops', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('stops', () => {
    it('should return all stops when no params are provided', async () => {
      const mockedStops = mockStops([{}, {}]);
      jest.spyOn(axios, 'get').mockResolvedValue({ data: { stops: mockedStops } });

      const result = await stops({});

      expect(result).toMatchObject(mockedStops);
      expect(result).toHaveLength(2);
    });

    it('should return only the stops specified by params', async () => {
      const input = { stopDesc: faker.random.word(), stopCode: '01' };
      const mockedStops = mockStops([input, { stopDesc: input.stopDesc, stopCode: '02' }, {}]);
      jest.spyOn(axios, 'get').mockResolvedValue({ data: { stops: mockedStops } });

      const result = await stops(input);

      expect(result).toMatchObject([mockedStops[0]]);
      expect(result).toHaveLength(1);
    });
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
    jest.mock('axios');
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    it('should return all vehicles for all stops when no params are provided', async () => {
      const mockedVehicles = mockVehicles([{}, {}]);
      mockedAxios.get
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
      mockedAxios.get
        .mockImplementationOnce(() => Promise.resolve({ data: { departures: mockedVehicles } }))
        .mockImplementationOnce(() => Promise.resolve({ data: { departures: mockedVehicles } }));

      const result = await vehiclesForStops([1461, 1462], input);

      expect(result).toMatchObject([
        { '1461': [mockedVehicles[0]] },
        { '1462': [mockedVehicles[0]] },
      ]);
    });
  });
});
