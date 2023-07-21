import { UserDocument } from '../interfaces/user';
import User from '../model/user';

export class UserRepository {
  private users: UserDocument[] = [];

  public create(user: UserDocument): Promise<UserDocument> {
    return new User(user).save();
  }

  public findByEmail = (email: string) =>
    this.users.find((u) => u.email === email);
}
