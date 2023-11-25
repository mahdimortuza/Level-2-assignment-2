"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
// create user  data on the database
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userData } = req.body;
        // user data validation using zod
        const zodParsedUserData = user_validation_1.default.parse(userData);
        // will call service function to send this data
        const result = yield user_service_1.UserServices.createUserIntoDB(zodParsedUserData);
        // send response
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Can not create the user',
            error: {
                code: 404,
                description: 'User can not be created. Please try again!',
            },
        });
    }
});
// get all users data from the database
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: 'user retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Can not find the users',
            error: {
                code: 404,
                description: 'User not found. Please, try again!',
            },
        });
    }
});
// get single user data from the database
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'user is retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Can not fnd the user',
            error: {
                code: 404,
                description: 'User not found. Please, try again!',
            },
        });
    }
});
// get single user data from the database
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.deleteUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'user is deleted successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Can not fnd the user',
            error: {
                code: 404,
                description: 'Can not delete the user. Please, try again!',
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { user: userData } = req.body;
        const result = yield user_service_1.UserServices.updateUserInBD({ userId }, userData);
        res.status(200).json({
            success: true,
            message: 'user is updated successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Can not fnd the user',
            error: {
                code: 404,
                description: 'Can not update the user. Please, try again!',
            },
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
};
