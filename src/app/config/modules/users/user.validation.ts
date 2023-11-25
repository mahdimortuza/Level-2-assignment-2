import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

// const orderValidationSchema = z.object({
//   productName: z.string(),
//   price: z.number(),
//   quantity: z.number(),
// });

export const userValidationSchema = z.object({
  userId: z.number(),
  userName: z.string(),
  password: z
    .string()
    .min(6, { message: 'Password must be more than 6 characters' })
    .max(20, { message: 'Password must be less than 20 characters' }),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.enum(['active', 'inActive']).default('active'),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  // orders: z.array(orderValidationSchema),
});

export default userValidationSchema;
