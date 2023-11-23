import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// create user  data on the database
router.post('/api/users', UserControllers.createUser);

// get all users data from the database
router.get('/api/users', UserControllers.getAllUsers);

// get single user data from the database
router.get('/api/users/:userId', UserControllers.getSingleUser);

export const UsersRoutes = router;
