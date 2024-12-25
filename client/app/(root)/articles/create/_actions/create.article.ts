"use server";

import { ArticlesService } from "@/services/articles/articles.service";
import { redirect } from "next/navigation";
import { z } from "zod";

const createArticleSchema = z.object({
  title: z
    .string()
    .min(1, "Title must have at least 1 character")
    .max(30, "Title must have no more 30 characters"),
  categoryId: z.string({
    invalid_type_error: "Invalid category",
    required_error: "Choose category",
  }),
  description: z
    .string()
    .min(1, "Description must have at least 1 character")
    .max(200, "Title must have no more 200 characters"),
  content: z.string().min(1, "Content must have at least 1 character"),
});

type CreateArticleState = {
  errors?: {
    title?: string[];
    description?: string[];
    categoryId?: string[];
    content?: string[];
    root?: string;
  };
} | null;

export const createArticle = async (
  prevState: CreateArticleState,
  formData: FormData
): Promise<CreateArticleState> => {
  const validatedFields = createArticleSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    categoryId: formData.get("categoryId"),
  });

  if (validatedFields.error) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const rawFormData = validatedFields.data;
  const res = await ArticlesService.create(rawFormData);

  if (res.error) {
    return {
      errors: {
        root: res.message,
      },
    };
  }

  redirect(`/articles/${res.id}`);
};
