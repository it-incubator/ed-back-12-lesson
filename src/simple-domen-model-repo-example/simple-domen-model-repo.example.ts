import { UserModel } from '../features/users/domain/user.entity';

type UserDto = {
  name: string;
  age: number;
};

export class UsersRepository {
  async createUser(userDto: UserDto): Promise<string> {
    const result = await UserModel.create(userDto);

    return result.id;
  }

  async updateUser(userDto: UserDto, userId: string): Promise<boolean | null> {
    const result = await UserModel.findOneAndUpdate({ _id: userId });

    if (!result) {
      return null;
    }

    return true;
  }
}
