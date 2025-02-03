"use server";

import { CommentsService } from "@/services/comments/comments.service";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  text: z.string().min(1, "Text is required").trim(),
});

export type CreateCommentState = {
  errors?: {
    text?: string[];
    root?: string;
  };
  success?: boolean;
} | null;

export const createComment = async (
  articleId: number,
  prevState: CreateCommentState,
  formData: FormData
): Promise<CreateCommentState> => {
  const validatedFields = createCommentSchema.safeParse({
    text: formData.get("text"),
  });

  if (validatedFields.error) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const rawFormData = validatedFields.data;
  const res = await CommentsService.createComment({
    articleId,
    ...rawFormData,
  });

  if (res.statusCode >= 400) {
    return {
      errors: {
        root: res.message,
      },
      success: false,
    };
  }

  revalidatePath(`/articles/${articleId}`);

  return { success: true };
};
