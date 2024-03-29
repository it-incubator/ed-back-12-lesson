import mongoose, { model, Model, ObjectId } from 'mongoose';

enum Currency {
  BYN = 'BYN',
  USD = 'USD',
  BTC = 'BTC',
}

export type Wallet = {
  _id: ObjectId;
  createdAt: Date;
  balance: number;
  currency: Currency;
};
export const walletSchema = new mongoose.Schema<Wallet>({
  createdAt: { type: Date, required: true },
  balance: { type: Number, required: true },
  currency: { type: String, enum: Currency, required: true },
});
type WalletModel = Model<Wallet, {}, {}> & typeof walletStatic;
export const walletStatic = {
  createDefaultWallet() {
    return new WalletModel({ createdAt: new Date(), balance: 100, currency: Currency.BTC });
  },
};

walletSchema.statics = walletStatic;

export const WalletModel = model<Wallet, WalletModel>('wallet', walletSchema, 'users-l4');
