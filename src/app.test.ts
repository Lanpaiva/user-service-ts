const expressMock = { use: jest.fn() };

import { App } from './app';

jest.mock('express', () => () => expressMock);

describe('SetConfig App test', () => {
  test('should create and call setConfig method properly', () => {
    new App();

    expect(expressMock.use).toBeCalledTimes(3);
  });
});
