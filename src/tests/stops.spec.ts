import faker from '@faker-js/faker';
import axios from 'axios';
import { stops } from '../index';
import { mockStops } from './mocks';

describe('stops', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all stops when no params are provided', async () => {
    const mockedStops = mockStops([{}, {}]);
    jest.spyOn(axios, 'get').mockResolvedValue({ data: { stops: mockedStops } });

    const result = await stops();

    expect(result).toMatchObject(mockedStops);
  });

  it('should return only the stops specified by params', async () => {
    const input = { stopDesc: faker.random.word(), stopCode: '01' };
    const mockedStops = mockStops([input, { stopDesc: input.stopDesc, stopCode: '02' }, {}]);
    jest.spyOn(axios, 'get').mockResolvedValue({ data: { stops: mockedStops } });

    const result = await stops(input);

    expect(result).toMatchObject([mockedStops[0]]);
  });
});
