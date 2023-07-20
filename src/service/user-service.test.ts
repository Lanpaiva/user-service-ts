import { UserEmailAlreadyExistsException } from '../exceptions/invalid-user-email-already-exists-exception';
import { User } from '../interfaces/user';
import { UserService } from './user-service';

class NoErrorException extends Error {}

const errorWrapper = (callback: () => void): Error => {
  try {
    callback();
    throw new NoErrorException();
  } catch (error) {
    return error;
  }
};

const USER_ID_MOCK = Math.random();

const USER_MOCK: User = {
  name: 'user',
  email: 'return_mock@node.com',
  password: '123',
  confirm_password: '123'
};

const CREATE_USER_MOCK = jest.fn(() => USER_ID_MOCK);

jest.mock('../repository/user-repository', () => ({
  UserRepository: jest.fn().mockImplementation(() => ({
    findByEmail: (email: string) =>
      email == 'return_mock@node.com' ? USER_MOCK : undefined,
    create: CREATE_USER_MOCK
  }))
}));

describe('UserService tests', () => {
  test('should throw UserEmailAlreadyExistsException when user email already exists', () => {
    //arrange
    const userService = new UserService();

    //act
    // userService.createUser(user);
    const error = errorWrapper(() => userService.createUser(USER_MOCK));

    //assert
    expect(error).toBeInstanceOf(UserEmailAlreadyExistsException);
    expect(error.message).toBe('Invalid email: Already Exists!');
  });

  test('should return user ID when user is created successfully', () => {
    const user: User = {
      ...USER_MOCK,
      email: 'user@test.com'
    };
    const userService = new UserService();

    //act
    const userId = userService.createUser(user);

    expect(CREATE_USER_MOCK).toBeCalledWith(user);
    expect(userId).toBe(USER_ID_MOCK);
  });

  test('should return user when search user by email', () => {
    const userService = new UserService();

    // userService.createUser(expectedUser);
    const user = userService.findByEmail(USER_MOCK.email);

    expect(user).toStrictEqual(USER_MOCK);
  });
});
