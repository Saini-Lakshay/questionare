import { z } from "zod";

export const quesValidation = z
  .string()
  .min(3, { message: "Question must be atlease 3 chars long" });
export const ansValidation = z
  .string()
  .min(3, { message: "Question must be atlease 3 chars long" });

export const questionSchema = z.object({
  ques: quesValidation,
  ans: ansValidation,
});
