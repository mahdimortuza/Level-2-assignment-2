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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Can not create the user',
      error: {
        code: 404,
        description: 'User not found!',
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
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
