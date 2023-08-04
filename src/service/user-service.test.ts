import { UserDocument } from '../documents/user';
import { UserEmailAlreadyExistsException } from '../exceptions/invalid-user-email-already-exists-exception';
import { UserService } from './user-service';

const USER_MOCK = {
  name: 'user',
  email: 'return_mock@node.com',
  password: '123'
} as UserDocument;

const CREATE_USER_MOCK = jest.fn(() => USER_MOCK);

jest.mock('../repository/user-repository', () => ({
  UserRepository: jest.fn().mockImplementation(() => ({
    findByEmail: (email: string) =>
      email === 'return_mock@node.com' ? USER_MOCK : undefined,
    create: CREATE_USER_MOCK
  }))
}));

describe('UserService tests', () => {
  test('should throw UserEmailAlreadyExistsException when user email already exists', async () => {
    //arrange
    const userService = new UserService();
    try {
      await userService.createUser(USER_MOCK);
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(UserEmailAlreadyExistsException);
      expect(error.message).toBe('Invalid email: Already Exists!');
    }
  });

  test('should return user document when user is created successfully', async () => {
    const user = {
      ...USER_MOCK,
      email: 'user@test.com'
    } as UserDocument;
    const userService = new UserService();

    //act
    const UserDocument = await userService.createUser(user);

    expect(CREATE_USER_MOCK).toBeCalledWith(user);
    expect(UserDocument).toStrictEqual(USER_MOCK);
  });

  test('should return user when search user by email', async () => {
    const userService = new UserService();

    // userService.createUser(expectedUser);
    const user = await userService.findByEmail(USER_MOCK.email);

    expect(user).toStrictEqual(USER_MOCK);
  });
});
