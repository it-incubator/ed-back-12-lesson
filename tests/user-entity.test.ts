import { UserModel } from '../src/features/users/domain/user.entity';
import { describe } from 'node:test';
import { UserService } from '../src/features/users/application/user.service';
import { UsersRepository } from '../src/features/users/infra/users.repository';

describe('user entity', () => {
  it('should create new user with default wallet', () => {
    const user = UserModel.createUser({ age: 25, name: 'ivan' });

    expect(user.wallets[0].balance).toBe(100);
  });

  it('should create new user without default wallet if age < 18', () => {
    const user = UserModel.createUser({ age: 17, name: 'ivan' });

    expect(user.wallets).toHaveLength(0);
  });
});

describe('userService.calculateTransfer', () => {
  it('should transfer money from first user to second', () => {
    const firstUser = UserModel.createUser({ age: 25, name: 'ivan' });
    const secondUser = UserModel.createUser({ age: 25, name: 'ivan2' });

    const userService = new UserService({} as UsersRepository);

    //cast type because calculateTransfer private method
    (
      userService as unknown as { calculateTransfer: UserService['calculateTransfer'] }
    ).calculateTransfer(firstUser, secondUser, {
      amount: 100,
      fromUserWalletId: firstUser.wallets[0]._id.toString(),
      toUserWalletId: secondUser.wallets[0]._id.toString(),
    });
    expect(firstUser.wallets[0].balance).toBe(0);
    expect(secondUser.wallets[0].balance).toBe(200);
  });
});

