"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { AuthService } from "../services/auth.service";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must contain at least 3 characters")
      .trim(),
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .trim(),
    confirmPassword: z.string().trim(),
    fullname: z
      .string()
      .min(1, "Full Name must contain at least 1 character")
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpState = {
  errors?: {
    username?: string;
    password?: string;
    confirmPassword?: string;
    fullname?: string;
    root?: string;
  };
} | null;

export const signUp = async (prevState: SignUpState, formData: FormData) => {
  const validatedFields = signUpSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    fullname: formData.get("fullname"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    } as SignUpState;
  }

  const { confirmPassword, ...rawFormData } = validatedFields.data;
  const res = await AuthService.signUp(rawFormData);

  if (res.error) {
    return {
      errors: {
        root: res.message,
      },
    } as SignUpState;
  }

  redirect("/sign-in");
};
