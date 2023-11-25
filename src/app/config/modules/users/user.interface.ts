import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

// export type TOrders = {
//   productName: string;
//   price: number;
//   quantity: number;
// };

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  // orders: TOrders[];
  isDeleted: boolean;
};

// interface IUserMethods {
//   fullName(): string;
// }
// Create a new Model type that knows about IUserMethods...

export type UserMethods = {
  isUserExists(userId: string): Promise<TUser | null>;
};

export type UserModel = Model<TUser, Record<string, never>, UserMethods>;
