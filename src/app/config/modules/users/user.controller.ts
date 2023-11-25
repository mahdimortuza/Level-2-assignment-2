import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

// create user  data on the database
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // user data validation using zod
    const zodParsedUserData = userValidationSchema.parse(userData);

    // will call service function to send this data
    const result = await UserServices.createUserIntoDB(zodParsedUserData);

    // send response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
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

// get all users data from the database

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'user retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Can not find the users',
      error: {
        code: 404,
        description: 'User not found. Please, try again!',
      },
    });
  }
};

// get single user data from the database
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'user is retrieved successfully',
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

// get single user data from the database
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
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: userData } = req.body;
    const result = await UserServices.updateUserInBD({ userId }, userData);
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

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
