import faker from '@faker-js/faker';
import axios from 'axios';
import { Ztm } from '../index';
import { mockStop, mockStops } from './mocks';

describe('Ztm', () => {
  const ztm = new Ztm();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('stops', () => {
    it('should return all stops when no params are provided', async () => {
      const mockedStop = mockStop({});
      jest.spyOn(axios, 'get').mockResolvedValue({ data: { stops: [mockedStop] } });

      const stops = await ztm.stops();

      expect(stops).toMatchObject([mockedStop]);
    });

    it('should return only the stops specified by params', async () => {
      const input = { stopDesc: faker.random.word(), stopCode: '01' };
      const mockedStops = mockStops([input, { stopDesc: input.stopDesc, stopCode: '02' }, {}]);
      jest.spyOn(axios, 'get').mockResolvedValue({ data: { stops: mockedStops } });

      const stops = await ztm.stops(input);

      expect(stops).toMatchObject([mockedStops[0]]);
    });
  });
});
