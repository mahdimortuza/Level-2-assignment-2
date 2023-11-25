import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// default route
router.get('/', UserControllers.defaultRoute);

// create user  data on the database
router.post('/api/users', UserControllers.createUser);

// get all users data from the database
router.get('/api/users', UserControllers.getAllUsers);

// get single user data from the database
router.get('/api/users/:userId', UserControllers.getSingleUser);

// delete user data from the database
router.delete('/api/users/:userId', UserControllers.deleteUser);

// update user data in the database
router.put('/api/users/:userId', UserControllers.updateUser);

export const UsersRoutes = router;
