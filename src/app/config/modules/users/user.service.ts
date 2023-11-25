import { User } from '../user.model';
import { TUser } from './user.interface';

// create users data on the database
const createUserIntoDB = async (userData: TUser) => {
  // const result = await UserModel.create(user); // built in static method

  const user = new User(userData); // create an instance

  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists.');
  }

  const result = await user.save(); // built in instance method provided by mongoose

  return result;
};

// get all users data from the database
const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

// get single user data from the database
const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};

// delete user data from the database
const deleteUserFromDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
