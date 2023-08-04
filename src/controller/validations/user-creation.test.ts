import { InvalidPayloadException } from '../../exceptions/invalid-payload-excepection';
import { UserRequestDTO } from '../dto/user-request';
import { REQUIRED_FIELDS, validateUserPayload } from './user-creation';

class NoErrorException extends Error {}

const errorWrapper = (callback: () => void): Error => {
  try {
    callback();
    throw new NoErrorException();
  } catch (error) {
    return error;
  }
};

describe('Creating user validation tests', () => {
  test('should throw InvalidPayloadException when field is required', () => {
    REQUIRED_FIELDS.forEach((field) => {
      [null, undefined, '', ' '].forEach((value) => {
        const user = {
          name: 'user',
          email: 'usertest@test.com',
          password: '123',
          confirm_password: '123',
          [field]: value
        };

        const error = errorWrapper(() =>
          validateUserPayload(user as UserRequestDTO)
        );

        expect(error).toBeInstanceOf(InvalidPayloadException);
        expect(error.message).toBe(
          `invalid payload: field ${field} should be informed!`
        );
      });
    });
  });

  test('should throw InvalidPayloadException when email is invalid', () => {
    const INVALID_EMAILS = ['user', '@user.com'];

    INVALID_EMAILS.forEach((value) => {
      const user: UserRequestDTO = {
        name: 'user',
        email: value,
        password: '123',
        confirm_password: '123'
      };

      const error = errorWrapper(() => validateUserPayload(user));

      expect(error).toBeInstanceOf(InvalidPayloadException);
      expect(error.message).toBe('message: field email invalid');
    });
  });

  test(
    'should throw InvalidPayloadException whenthere is' +
      'different password and confirm_password',
    () => {
      const user: UserRequestDTO = {
        name: 'user',
        email: 'usertest@test.com',
        password: '1231',
        confirm_password: '1231 '
      };

      const error = errorWrapper(() => validateUserPayload(user));

      expect(error).toBeInstanceOf(InvalidPayloadException);
      expect(error.message).toBe(
        `message: password and confirm_password must be equals`
      );
    }
  );

  test('should throw NoErrorException when user payload is is valid', () => {
    const user: UserRequestDTO = {
      name: 'user',
      email: 'usertest@test.com',
      password: '123',
      confirm_password: '123'
    };

    const error = errorWrapper(() => validateUserPayload(user));

    expect(error).toBeInstanceOf(NoErrorException);
  });
});
