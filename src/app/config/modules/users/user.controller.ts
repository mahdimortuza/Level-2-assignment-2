import { Request, Response } from 'express';
import { UserServices } from './user.service';

// create user  data on the database
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // will call service function to send this data
    const result = await UserServices.createUserIntoDB(userData);

    // send response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
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
