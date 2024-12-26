import mongoose, { HydratedDocument, model, Model, ObjectId } from 'mongoose';

enum Currency {
  BYN = 'BYN',
  USD = 'USD',
  BTC = 'BTC',
}

export type Wallet = {
  createdAt: Date;
  balance: number;
  currency: Currency;
};

export type WalletDocument = HydratedDocument<Wallet>;

export const walletSchema = new mongoose.Schema<Wallet>({
  createdAt: { type: Date, required: true },
  balance: { type: Number, required: true },
  currency: { type: String, enum: Currency, required: true },
});
type WalletModel = Model<Wallet, {}, {}> & typeof WalletEntity;

export class WalletEntity {
  constructor(
    public _id: ObjectId,
    public createdAt: Date,
    public balance: number,
    public currency: Currency
  ) {}

  static createDefaultWallet() {
    return new WalletModel({ createdAt: new Date(), balance: 100, currency: Currency.BTC });
  }
}
walletSchema.loadClass(WalletEntity);

export const WalletModel = model<Wallet, WalletModel>('wallet', walletSchema, 'users-l4');
