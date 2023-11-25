"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// default route
router.get('/', user_controller_1.UserControllers.defaultRoute);
// create user  data on the database
router.post('/api/users', user_controller_1.UserControllers.createUser);
// get all users data from the database
router.get('/api/users', user_controller_1.UserControllers.getAllUsers);
// get single user data from the database
router.get('/api/users/:userId', user_controller_1.UserControllers.getSingleUser);
// delete user data from the database
router.delete('/api/users/:userId', user_controller_1.UserControllers.deleteUser);
// update user data in the database
router.put('/api/users/:userId', user_controller_1.UserControllers.updateUser);
exports.UsersRoutes = router;
