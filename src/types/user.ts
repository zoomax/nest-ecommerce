import * as mongoose from 'mongoose';

interface Address {
  city: string;
  zipCode: number;
  state: string;
  country: string;
  addr1: string;
  addr2: string;
}

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  seller: boolean;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}
