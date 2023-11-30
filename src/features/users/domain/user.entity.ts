import * as mongoose from 'mongoose';
import { Model, model, HydratedDocument, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto';

enum Currency {
  BYN = 'BYN',
  USD = 'USD',
  BTC = 'BTC',
}

type Wallet = {
  _id: ObjectId;
  createdAt: Date;
  balance: number;
  currency: Currency;
};

type User = {
  name: string;
  age: number;
  wallets: Wallet[];
};

type UserMethods = typeof userMethods;
type UserStatics = typeof userStatics;

type UserModel = Model<User, {}, UserMethods> & UserStatics;

export type UserDocument = HydratedDocument<User, UserMethods>;

const walletSchema = new mongoose.Schema<Wallet>({
  createdAt: { type: Date, required: true },
  balance: { type: Number, required: true },
  currency: { type: String, enum: Currency, required: true },
});

type WalletModel = Model<Wallet, {}, {}> & typeof walletStatic;

const walletStatic = {
  createDefaultWallet() {
    return new WalletModel({ createdAt: new Date(), balance: 100, currency: Currency.BTC });
  },
};

walletSchema.statics = walletStatic;

const WalletModel = model<Wallet, WalletModel>('wallet', walletSchema, 'users-l4');

const userSchema = new mongoose.Schema<User, UserModel, UserMethods>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    wallets: { type: [walletSchema] },
  },
  { optimisticConcurrency: true }
);

const userMethods = {
  convertMoney(fromWalletId: string, toWalletId: string, amount: number) {
    const fromWallet = (this as UserDocument).wallets.find(
      (wallet) => wallet._id.toString() === fromWalletId
    );

    const toWallet = (this as UserDocument).wallets.find(
      (wallet) => wallet._id.toString() === toWalletId
    );

    if (!fromWallet || !toWallet) {
      throw new Error('some wallet not found');
    }

    fromWallet.balance = fromWallet.balance - amount;
    toWallet.balance += amount;
  },

  increaseWalletBalance(walletId: string, amount: number) {
    const wallet = (this as UserDocument).wallets.find(
      (wallet) => wallet._id.toString() === walletId
    );

    if (!wallet) {
      throw new Error('wallet not found');
    }

    wallet.balance += amount;
  },

  decreaseWalletBalance(walletId: string, amount: number) {
    const wallet = (this as UserDocument).wallets.find(
      (wallet) => wallet._id.toString() === walletId
    );

    if (!wallet) {
      throw new Error('wallet not found');
    }

    wallet.balance -= amount;
  },
};

const userStatics = {
  createUser(dto: CreateUserDto) {
    const user = new UserModel() as UserDocument;
    user.age = dto.age;
    user.name = dto.name;

    if (user.age < 16) {
      throw new Error('too yang');
    }

    if (dto.age < 18) {
      user.wallets = [];

      return user;
    }

    user.wallets = [WalletModel.createDefaultWallet()];
    return user;
  },
};

userSchema.methods = userMethods;
userSchema.statics = userStatics;

export const UserModel = model<User, UserModel>('users-l4', userSchema);
