import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);
