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
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const zodParsedData = user_validation_1.default.parse(user);
        const result = yield user_service_1.UserServices.createUserIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'User is created successfully!',
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
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'users are fetched successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Can not find the users',
            error: {
                code: 404,
                description: 'Users not found. Please, try again!',
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'user is fetched successfully',
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
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = req.body;
        const result = yield user_service_1.UserServices.updateUserInBD({ userId }, user);
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
// const addProduct = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const product = req.body;
//     const result = await UserServices.addProductToUser(userId, product);
//     if (!result) {
//       res.status(200).json({
//         success: true,
//         message: 'Can not fnd the user',
//         data: result,
//       });
//       return;
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Order created successfully!',
//       data: null,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong',
//       error: err,
//     });
//   }
// };
exports.UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    // addProduct,
};
