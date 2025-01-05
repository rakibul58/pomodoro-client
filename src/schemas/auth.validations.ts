import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email").toLowerCase(),
  password: z
    .string({ required_error: "Please add a Password" })
    .min(1, "Please add a Password")
    .trim(),
});

const changePasswordValidationSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Please add current Password" })
      .min(1, "Please add current Password")
      .trim(),
    newPassword: z
      .string({ required_error: "Please add a Password" })
      .min(1, "Please add a Password")
      .trim(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const createUserValidationSchema = z.object({
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Please add a password"),
  email: z
    .string({
      required_error: "Email is required!",
    })
    .min(1, "Please add an Email"),
  name: z
    .string({
      required_error: "Name numbers is required!",
    })
    .min(1, "Please add your name"),
});

export const AuthValidations = {
  loginValidationSchema,
  createUserValidationSchema,
  changePasswordValidationSchema,
};
