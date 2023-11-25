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
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const __1 = __importDefault(require(".."));
const fullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
    },
});
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, 'Street address is required'],
        trim: true,
    },
    city: { type: String, required: [true, 'City name is required'], trim: true },
    country: {
        type: String,
        required: [true, 'Country name is required'],
        trim: true,
    },
});
// const orderSchema = new Schema<TOrders>({
//   productName: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
// });
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'User ID is required'],
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'User name is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
    },
    fullName: {
        type: fullNameSchema,
        required: [true, 'Full name is required'],
        trim: true,
    },
    age: { type: Number, required: [true, 'Age is required'], trim: true },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    hobbies: {
        type: [String],
        required: [true, 'Hobbies are required'],
        trim: true,
    },
    address: {
        type: addressSchema,
        required: [true, 'Address is required'],
        trim: true,
    },
    // orders: { type: [orderSchema], required: true },
    isDeleted: { type: Boolean, default: false },
});
// pre save middleware / hook will work on create(), save()
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(this, 'pre hook we will save the data');
        //hashing password and saving into db
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(__1.default.bcrypt_salt_round));
        next();
    });
});
// post save middleware / hook
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
// query middleware
userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// userSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });
// creating schema for interface
userSchema.methods.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
