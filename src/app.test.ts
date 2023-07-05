const JSON_MOCK = { limit: '50mb' };
const URL_ENCODED_MOCK = { limit: '50mb', extended: true };
const CORS_RETURN_MOCK = '';

const EXPRESS_MOCK = { use: jest.fn() };
const BODY_PARSER_MOCK = {
  json: jest.fn(() => JSON_MOCK),
  urlencoded: jest.fn(() => URL_ENCODED_MOCK)
};
const CORS_MOCK = () => CORS_RETURN_MOCK;

import { App } from './app';

jest.mock('express', () => () => EXPRESS_MOCK);
jest.mock('body-parser', () => BODY_PARSER_MOCK);
jest.mock('cors', () => CORS_MOCK);
jest.mock('./controller/user-controller');

describe('App test', () => {
  test('should test config express application', () => {
    new App();

    expect(EXPRESS_MOCK.use).toBeCalledTimes(4);
    expect(EXPRESS_MOCK.use).toHaveBeenNthCalledWith(1, JSON_MOCK);
    expect(EXPRESS_MOCK.use).toHaveBeenNthCalledWith(2, URL_ENCODED_MOCK);
    expect(EXPRESS_MOCK.use).toHaveBeenNthCalledWith(3, CORS_RETURN_MOCK);
    expect(BODY_PARSER_MOCK.json).toBeCalledWith(JSON_MOCK);
    expect(BODY_PARSER_MOCK.urlencoded).toBeCalledWith(URL_ENCODED_MOCK);
  });
});
