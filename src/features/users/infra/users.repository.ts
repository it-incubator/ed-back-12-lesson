import { UserDocument, UserModel } from '../domain/user.entity';

export class UsersRepository {
  async save(user: UserDocument) {
    await user.save();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findOne({ _id: id });
  }

  async findByIdOrThrow(id: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new Error('not found');
    }

    return user;
  }
}
