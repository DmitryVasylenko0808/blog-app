"use server";

import { UsersService } from "@/services/users/users.service";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateUserSchema = z.object({
  fullname: z
    .string()
    .min(1, "Full Name must have at least 3 characters")
    .trim(),
  about: z.string().trim().optional(),
});

export type UpdateUserState = {
  errors?: {
    fullname?: string;
    about?: string;
    root?: string;
  };
  message?: string;
} | null;

export const updateUser = async (
  id: number,
  prevState: UpdateUserState,
  formData: FormData
) => {
  const validatedFields = updateUserSchema.safeParse({
    fullname: formData.get("fullname"),
    about: formData.get("about"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    } as UpdateUserState;
  }

  const rawFormData = validatedFields.data;
  const res = await UsersService.updateUser({ id, ...rawFormData });

  if (res.error) {
    return {
      errors: {
        root: res.message,
      },
    } as UpdateUserState;
  }

  revalidatePath(`/users/${id}`);

  return { message: "Profile is successfully updated" } as UpdateUserState;
};
