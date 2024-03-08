import { UsersRepository } from '../infra/users.repository';
import { Currency, UserModel, Wallet } from '../domain/user.entity';
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

    user.wallets = [];
    // some business logic
    if (user.age > 18) {
      user.wallets = [{ balance: 100, createdAt: new Date(), currency: Currency.BTC }];
    }

    await this.userRepository.save(user);
  }

  async updateUserWallets(dto: { newWallets: Wallet[] }, id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      //TODO: ObjectResult
      return false;
    }
    // some business logic
    if (user.age > 18) {
      user.wallets = dto.newWallets;
    }

    await this.userRepository.save(user);

    return true;
  }
}
