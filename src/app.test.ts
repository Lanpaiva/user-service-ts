const JSON_MOCK = { limit: '50mb' };
const URL_ENCODED_MOCK = { limit: '50mb', extended: true };
const CORS_RETURN_MOCK = 'cors return';

const EXPRESS_MOCK = { use: jest.fn() };
const BODY_PARSER_MOCK = {
  json: jest.fn(() => JSON_MOCK),
  urlencoded: jest.fn(() => URL_ENCODED_MOCK)
};
const CORS_MOCK = jest.fn(() => CORS_RETURN_MOCK);
const MONGODB_MOCK = {
  connect: jest.fn(() => ({
    connection: { name: 'test-connection-name' }
  }))
};

import { App } from './app';
import { MONGO_URI } from './contants/database';

jest.mock('express', () => () => EXPRESS_MOCK);
jest.mock('body-parser', () => BODY_PARSER_MOCK);
jest.mock('cors', () => CORS_MOCK);
jest.mock('./controller/user-controller');
jest.mock('mongoose', () => MONGODB_MOCK);

describe('App tests', () => {
  test('should create and call setConfig methods properly', () => {
    new App();

    // expect(EXPRESS_MOCK.use).toBeCalledTimes(4);
    // expect(EXPRESS_MOCK.use).toHaveBeenNthCalledWith(1, JSON_MOCK);
    // expect(EXPRESS_MOCK.use).toHaveBeenNthCalledWith(2, URL_ENCODED_MOCK);
    expect(EXPRESS_MOCK.use).toHaveBeenNthCalledWith(3, CORS_RETURN_MOCK);
    expect(BODY_PARSER_MOCK.json).toBeCalledWith(JSON_MOCK);
    expect(BODY_PARSER_MOCK.urlencoded).toBeCalledWith(URL_ENCODED_MOCK);
    expect(MONGODB_MOCK.connect).toBeCalledWith(MONGO_URI);
  });
});
