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

  static createUser(dto: CreateUserDto) {
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

  static init(dto: UserEntity) {
    return new UserEntity(dto.name, dto.age, dto.wallets);
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

//service, repository example
class UsersRepository {
  async save(user: UserEntity): Promise<void> {
    //insert or update user in DB
    return Promise.resolve();
  }

  async findById(id: string): Promise<UserEntity | null> {
    //get user data from bd
    //const result = await db.findOne(id)

    //create UserEntity instance and return
    return Promise.resolve(
      UserEntity.init({
        /*...result*/
      } as UserEntity)
    );
  }
}

export class UserService {
  constructor(private userRepository: UsersRepository) {}

  async createUser(dto: CreateUserDto) {
    const user = UserEntity.createUser(dto);

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
}
