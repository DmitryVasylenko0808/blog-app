"use server";

import { CommentsService } from "@/services/comments/comments.service";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const editCommentSchema = z.object({
  text: z.string().min(1, "Text is required").trim(),
});

export type EditCommentState = {
  errors?: {
    text?: string[];
    root?: string;
  };
  success?: boolean;
} | null;

export const editComment = async (
  articleId: number,
  commentId: number,
  prevState: EditCommentState,
  formData: FormData
): Promise<EditCommentState> => {
  const validatedFields = editCommentSchema.safeParse({
    text: formData.get("text"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const rawFormData = validatedFields.data;
  const res = await CommentsService.editComment({
    articleId,
    commentId,
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
