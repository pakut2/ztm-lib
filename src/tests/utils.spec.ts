import { calcDistance } from '../utils';

// This requires actual proper testing, but I was lazy

describe('utils', () => {
  it('should return the correct value in meters', () => {
    expect(calcDistance(54.408936647740816, 18.604928256351375, 54.40554, 18.60421)).toEqual(381);
  });
});
