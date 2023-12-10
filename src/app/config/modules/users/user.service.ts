import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const updateUserInBD = async (userId: object, userData: TUser) => {
  const result = await UserModel.findOneAndUpdate(userId, userData, {
    new: true,
  });
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await UserModel.updateOne({ userId }, { isDeleted: true });
  return result;
};

// const addProductToUser = async (userId: string, product: any) => {
//   const user = await UserModel.findOne({ userId });
//   if (!user) {
//     return null;
//   }
//   console.log(product);

//   user.orders.push(product);
//   // const givenUser = user.orders;

//   const result = await user.save();
//   return result;
// };
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInBD,
  deleteUserFromDB,
  // addProductToUser,
};
