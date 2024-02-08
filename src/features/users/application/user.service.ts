import { UsersRepository } from '../infra/users.repository';
import { UserDocument, UserModel } from '../domain/user.entity';
import { CreateUserDto } from '../domain/dto';

type TransferMoneyDto = {
  fromUserId: string;
  toUserId: string;
  fromUserWalletId: string;
  toUserWalletId: string;
  amount: number;
};

export class UserService {
  constructor(private userRepository: UsersRepository) {}

  async createUser(dto: CreateUserDto) {
    const user = new UserModel(dto);

    await this.userRepository.save(user);
  }
}
