import * as mongoose from 'mongoose';
import { HydratedDocument, model, Model } from 'mongoose';
import { CreateUserDto } from './dto';
import { Wallet, WalletDocument, WalletEntity, WalletModel, walletSchema } from './wallet.entity';

type User = {
  name: string;
  age: number;
  wallets: WalletDocument[];
};

interface UserMethods {
  convertMoney(fromWalletId: string, toWalletId: string, amount: number): void;
  increaseWalletBalance(walletId: string, amount: number): void;
  decreaseWalletBalance(walletId: string, amount: number): void;
}
type UserStatics = typeof UserEntity;

type UserModel = Model<User, {}, UserMethods> & UserStatics;

export type UserDocument = HydratedDocument<User, UserMethods>;

const userSchema = new mongoose.Schema<User, UserModel, UserMethods>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    wallets: { type: [walletSchema] },
  },
  { optimisticConcurrency: true }
);

class UserEntity {
  private constructor(
    public name: string,
    public age: number,
    public wallets: WalletDocument[]
  ) {}

  static createUser(dto: CreateUserDto) {
    const user = new UserModel({ ...dto, wallets: [] });

    if (user.age < 16) {
      throw new Error('too yang');
    }

    if (dto.age < 18) {
      user.wallets = [];

      return user;
    }

    user.wallets = [WalletModel.createDefaultWallet()];
    return user;
  }

  convertMoney(fromWalletId: string, toWalletId: string, amount: number) {
    const fromWallet = this.wallets.find((wallet) => wallet._id.toString() === fromWalletId);

    const toWallet = this.wallets.find((wallet) => wallet._id.toString() === toWalletId);

    if (!fromWallet || !toWallet) {
      throw new Error('some wallet not found');
    }

    fromWallet.balance = fromWallet.balance - amount;
    toWallet.balance += amount;
  }

  increaseWalletBalance(walletId: string, amount: number) {
    const wallet = this.wallets.find((wallet) => wallet._id.toString() === walletId);

    if (!wallet) {
      throw new Error('wallet not found');
    }

    wallet.balance += amount;
  }

  decreaseWalletBalance(walletId: string, amount: number) {
    const wallet = this.wallets.find((wallet) => wallet._id.toString() === walletId);

    if (!wallet) {
      throw new Error('wallet not found');
    }

    wallet.balance -= amount;
  }
}

userSchema.loadClass(UserEntity);

export const UserModel = model<User, UserModel>('users-l4', userSchema);
