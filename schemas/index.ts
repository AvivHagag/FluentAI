import * as z from "zod";

export const ResetSchema = z.object({
  email: z.string().email({
    message: "אימייל לא תקין",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "אימייל לא תקין",
  }),
  password: z.string().min(6, {
    message: " אנא הכנס סיסמא מעל 6 ספרות",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "נדרש אימייל",
  }),
  password: z.string().min(6, {
    message: "אנא הכנס מינימום 6 ספרות",
  }),
  name: z.string().min(1, {
    message: "אנא הכנס שם תקין",
  }),
});
