"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const fullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const addressValidationSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
exports.userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    fullName: fullNameValidationSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressValidationSchema,
    order: zod_1.z
        .array(zod_1.z.object({
        productName: zod_1.z.string(),
        price: zod_1.z.number(),
        quantity: zod_1.z.number(),
    }))
        .optional(),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.default = exports.userValidationSchema;
