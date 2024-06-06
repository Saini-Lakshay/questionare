import { z } from "zod";

export const emailValidation = z
  .string()
  .email({ message: "Invalid email address" });
export const passwordValidation = z
  .string()
  .min(4, { message: "Password must be 4 char long" })
  .max(8, { message: "Password must be less than 9 chars" });

export const signUpSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
