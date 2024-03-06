import * as mongoose from 'mongoose';
import { Model, model, HydratedDocument, ObjectId } from 'mongoose';

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

type UserModel = Model<User>;

export type UserDocument = HydratedDocument<User>;

const walletSchema = new mongoose.Schema<Wallet>({
  createdAt: { type: Date, required: true },
  balance: { type: Number, required: true, min: 0 },
  currency: { type: String, enum: Currency, required: true },
});

const userSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    wallets: { type: [walletSchema] },
  },
);



export const UserModel = model<User, UserModel>('users-l4', userSchema);