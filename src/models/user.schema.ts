import { Schema, HookNextFunction } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    seller: {
      type: Boolean,
      default: false,
    },
    address: {
      addr1: String,
      addr2: String,
      city: String,
      state: String,
      country: String,
      zip: Number,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next: HookNextFunction){
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this["password"], 8);
    this["password"] = hashedPassword;
    return next();
  } catch (error) {
    return next(error) ; 
  }
});
