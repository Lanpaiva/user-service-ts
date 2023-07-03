const expressMock = { use: jest.fn() };

import App from './app';

jest.mock('express', () => () => expressMock);

describe('App test', () => {
  test('should test config express application', () => {
    new App();

    expect(expressMock.use).toBeCalledTimes(3);
  });
});
