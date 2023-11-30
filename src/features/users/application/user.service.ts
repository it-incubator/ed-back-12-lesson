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
    const user = UserModel.createUser(dto);

    await this.userRepository.save(user);
  }

  async convertMoney(id: string, from: string, to: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('not found');
    }

    user.convertMoney(from, to, 100);

    await this.userRepository.save(user);
  }

  async transferMoney(dto: TransferMoneyDto) {
    const fromUser = await this.userRepository.findByIdOrThrow(dto.fromUserId);
    const toUser = await this.userRepository.findByIdOrThrow(dto.toUserId);

    this.calculateTransfer(fromUser, toUser, dto);

    await Promise.all([this.userRepository.save(fromUser), this.userRepository.save(toUser)]);
  }

  private calculateTransfer(
    fromUser: UserDocument,
    toUser: UserDocument,
    dto: Omit<TransferMoneyDto, 'fromUserId' | 'toUserId'>
  ) {
    //logic
    fromUser.decreaseWalletBalance(dto.fromUserWalletId, dto.amount);
    toUser.increaseWalletBalance(dto.toUserWalletId, dto.amount);
  }
}
