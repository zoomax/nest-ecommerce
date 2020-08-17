import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
        },
        qty: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true },
);
