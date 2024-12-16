"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";

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
  const res = await fetch("http://localhost:4444/api/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  const parsedRes = await res.json();

  if (!res.ok) {
    return {
      errors: {
        root: parsedRes.message,
      },
    } as SignUpState;
  }

  return null;
};

const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignInState = {
  errors?: {
    username?: string;
    password?: string;
    root?: string;
  };
} | null;

export const signIn = async (prevState: SignInState, formData: FormData) => {
  const validatedFields = signInSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    } as SignInState;
  }

  const rawFormData = validatedFields.data;
  const res = await fetch("http://localhost:4444/api/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  const parsedRes = await res.json();

  if (!res.ok) {
    return {
      errors: {
        root: parsedRes.message,
      },
    } as SignInState;
  }

  const { access_token } = parsedRes;

  await createSession(access_token);
  redirect("/");
};

export const logOut = async () => {
  await deleteSession();
  redirect("/sign-in");
};
