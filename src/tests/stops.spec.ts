import faker from '@faker-js/faker';
import axios from 'axios';
import { stops, nearStops } from '../index';
import { mockStops } from './mocks';
import * as utils from '../utils';

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

  describe('nearStops', () => {
    const mockedStops = mockStops([{}, {}, {}]);

    beforeEach(() => {
      jest.spyOn(axios, 'get').mockResolvedValue({ data: { stops: mockedStops } });

      jest
        .spyOn(utils, 'calcDistance')
        .mockImplementationOnce(() => 150)
        .mockImplementationOnce(() => 400)
        .mockImplementationOnce(() => 100);
    });

    it('should return sorted stops in 500m when radius is not provided', async () => {
      const result = await nearStops(
        faker.datatype.number({ min: 1, max: 90 }),
        faker.datatype.number({ min: 1, max: 90 }),
      );

      expect(result).toMatchObject([
        { ...mockedStops[2], distance: 100 },
        { ...mockedStops[0], distance: 150 },
        { ...mockedStops[1], distance: 400 },
      ]);
      expect(result).toHaveLength(mockedStops.length);
    });

    it('should return sorted stops in the provided radius', async () => {
      const result = await nearStops(
        faker.datatype.number({ min: 1, max: 90 }),
        faker.datatype.number({ min: 1, max: 90 }),
        {},
        200,
      );

      expect(result).toMatchObject([
        { ...mockedStops[2], distance: 100 },
        { ...mockedStops[0], distance: 150 },
      ]);
      expect(result).toHaveLength(2);
    });
  });
});
