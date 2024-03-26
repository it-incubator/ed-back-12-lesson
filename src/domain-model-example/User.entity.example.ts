import { CreateUserDto } from '../features/users/domain/dto';

enum Currency {
  BYN = 'BYN',
  USD = 'USD',
  BTC = 'BTC',
}

class WalletEntity {
  id: string;
  createdAt: Date;
  balance: number;
  currency: string;

  private constructor(createdAt: Date, balance: number, currency: string) {
    this.balance = balance;
    this.createdAt = createdAt;
    this.currency = currency;
    this.id = ''; //uuid for example
  }

  static createDefaultWallet() {
    return new WalletEntity(new Date(), 100, Currency.BTC);
  }
}

class UserEntity {
  id: string;
  name: string;
  age: number;
  wallets: WalletEntity[];

  private constructor(name: string, age: number, wallets: WalletEntity[]) {
    this.age = age;
    this.name = name;
    this.wallets = wallets;
    this.id = ''; //uuid for example
  }

  createUser(dto: CreateUserDto) {
    const user = new UserEntity(dto.name, dto.age, []);

    if (user.age < 16) {
      throw new Error('too yang');
    }

    if (dto.age < 18) {
      user.wallets = [];

      return user;
    }

    user.wallets = [WalletEntity.createDefaultWallet()];
    return user;
  }

  convertMoney(fromWalletId: string, toWalletId: string, amount: number) {
    const fromWallet = this.wallets.find((wallet) => wallet.id.toString() === fromWalletId);

    const toWallet = this.wallets.find((wallet) => wallet.id.toString() === toWalletId);

    if (!fromWallet || !toWallet) {
      throw new Error('some wallet not found');
    }

    fromWallet.balance = fromWallet.balance - amount;
    toWallet.balance += amount;
  }

  //other methods
}
