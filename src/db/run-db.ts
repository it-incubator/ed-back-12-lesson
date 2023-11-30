import mongoose from 'mongoose';

export const mongoUrl = 'mongodb://localhost:27017/wallets-ls4';

export async function runDb() {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected successfully to mongoDB server');
  } catch (error) {
    console.log("Can't connect to mongo server", error);
    await mongoose.disconnect();
  }
}
