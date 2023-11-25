import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '..';
import {
  TAddress,
  TFullName,
  // TOrders,
  TUser,
  UserMethods,
  UserModel,
} from './users/user.interface';

const fullNameSchema = new Schema<TFullName>({
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

const addressSchema = new Schema<TAddress>({
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

// const orderSchema = new Schema<TOrders>({
//   productName: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
// });

const userSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
    trim: true,
  },
  username: {
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
    type: Boolean,
    default: true,
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
  // orders: { type: [orderSchema], required: true },
  isDeleted: { type: Boolean, default: false },
});

// pre save middleware / hook will work on create(), save()
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook we will save the data');

  //hashing password and saving into db
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// post save middleware / hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// query middleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// userSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

// creating schema for interface
userSchema.methods.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
