import { UserEmailAlreadyExistsException } from '../exceptions/invalid-user-email-already-exists-exception';
import { User } from '../interfaces/user';
import { UserRepository } from '../repository/user-repository';

export class UserService {
  private userRepository = new UserRepository();

  public createUser(user: User): number {
    if (this.findByEmail(user.email)) {
      throw new UserEmailAlreadyExistsException(
        'Invalid email: Already Exists!'
      );
    }

    return this.userRepository.create(user);
  }

  public findByEmail = (email: string) =>
    this.userRepository.findByEmail(email);

  // public findByEmail = (email: string) => {
  //   const user = this.userRepository.findByEmail(email);
  //   return user?.name == 'user' ? user : undefined;
  // };
}
