import { Schema, model } from 'mongoose';
import { Address, FullName, Orders, User } from './users/user.interface';

const fullNameSchema = new Schema<FullName>({
  firstName: String,
  lastName: String,
});

const addressSchema = new Schema<Address>({
  street: String,
  city: String,
  country: String,
});

const orderSchema = new Schema<Orders>({
  productName: String,
  price: Number,
  quantity: Number,
});

const userSchema = new Schema<User>({
  userId: { type: Number, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: ['active', 'inActive'],
  hobbies: { type: [String], required: true },
  address: { type: addressSchema, required: true },
  orders: { type: [orderSchema], required: true },
});

export const UserModel = model<User>('User', userSchema);
