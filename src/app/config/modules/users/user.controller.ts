import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const zodParsedData = userValidationSchema.parse(user);
    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User is created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Can not create the user',
      error: {
        code: 404,
        description: 'User can not be created. Please try again!',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'users are fetched successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Can not find the users',
      error: {
        code: 404,
        description: 'Users not found. Please, try again!',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'user is fetched successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Can not fnd the user',
      error: {
        code: 404,
        description: 'User not found. Please, try again!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = req.body;
    const result = await UserServices.updateUserInBD({ userId }, user);
    res.status(200).json({
      success: true,
      message: 'user is updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Can not fnd the user',
      error: {
        code: 404,
        description: 'Can not update the user. Please, try again!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'user is deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Can not fnd the user',
      error: {
        code: 404,
        description: 'Can not delete the user. Please, try again!',
      },
    });
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const product = req.body;
    const result = await UserServices.addProductToUser(userId, product);

    if (!result) {
      res.status(200).json({
        success: true,
        message: 'Can not fnd the user',
        data: result,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addProduct,
};
