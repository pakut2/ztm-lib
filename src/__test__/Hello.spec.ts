import { Hello } from '../index';

describe('Hello', () => {
  it('should return a string including value provided as an argument', () => {
    expect(Hello('World')).toEqual('Hello World');
  });
});
