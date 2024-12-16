"use server";

import { createSession } from "@/app/_lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import { AuthService } from "../services/auth.service";

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
  const res = await AuthService.signIn(rawFormData);

  if (res.error) {
    return {
      errors: {
        root: res.message,
      },
    } as SignInState;
  }

  const { access_token } = res;

  await createSession(access_token);
  redirect("/");
};
