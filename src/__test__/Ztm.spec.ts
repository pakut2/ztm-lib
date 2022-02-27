import axios from 'axios';
import { Ztm } from '../index';
import { mockStop } from './__mocks__';

describe('Ztm', () => {
  const ztm = new Ztm();

  jest.mock('axios');

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('stops', () => {
    it('should return an array of stops', async () => {
      const stop = mockStop();
      jest.spyOn(axios, 'get').mockResolvedValue({ data: { stops: [stop] } });

      const stops = await ztm.stops({});

      expect(stops).toMatchObject([stop]);
    });
  });
});
