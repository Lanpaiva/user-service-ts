const expressMock = { use: jest.fn() };

import App from './app';

jest.mock('express', () => () => expressMock);

describe('App test', () => {
  test('test sum', () => {
    const myApp = new App();
  });
});
