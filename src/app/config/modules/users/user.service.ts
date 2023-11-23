import { UserModel } from '../user.model';
import { User } from './user.interface';

// create users data on the database
const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

// get all users data from the database
const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

// get single user data from the database
const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
