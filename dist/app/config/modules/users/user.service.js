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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("../user.model");
// create users data on the database
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await UserModel.create(user); // built in static method
    const user = new user_model_1.User(userData); // create an instance
    if (yield user.isUserExists(userData.userId)) {
        throw new Error('User already exists.');
    }
    const result = yield user.save(); // built in instance method provided by mongoose
    return result;
});
// get all users data from the database
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
// get single user data from the database
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId });
    // const result = await User.aggregate([{ $match: { userId: userId } }]);
    return result;
});
// delete user data from the database
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateOne({ userId }, { isDeleted: true });
    return result;
});
// delete user data from the database
const updateUserInBD = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate(userId, userData, {
        new: true,
    });
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserInBD,
};
