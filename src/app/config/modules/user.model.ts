import { Schema, model } from 'mongoose';
import { Address, FullName, Orders, User } from './users/user.interface';

const fullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
});

const addressSchema = new Schema<Address>({
  street: {
    type: String,
    required: [true, 'Street address is required'],
    trim: true,
  },
  city: { type: String, required: [true, 'City name is required'], trim: true },
  country: {
    type: String,
    required: [true, 'Country name is required'],
    trim: true,
  },
});

const orderSchema = new Schema<Orders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
    trim: true,
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'Full name is required'],
    trim: true,
  },
  age: { type: Number, required: [true, 'Age is required'], trim: true },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
  },
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
    required: true,
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies are required'],
    trim: true,
  },
  address: {
    type: addressSchema,
    required: [true, 'Address is required'],
    trim: true,
  },
  orders: { type: [orderSchema], required: true },
});

export const UserModel = model<User>('User', userSchema);
