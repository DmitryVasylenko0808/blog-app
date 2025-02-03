"use server";

import { CommentsService } from "@/services/comments/comments.service";
import { revalidatePath } from "next/cache";

export type DeleteCommentState = {
  success: boolean;
  message: string;
};

export const deleteComment = async (
  articleId: number,
  commentId: number
): Promise<DeleteCommentState> => {
  const res = await CommentsService.deleteComment({ articleId, commentId });

  if (res.statusCode >= 400) {
    return { success: false, message: res.message };
  }

  revalidatePath(`/articles/${articleId}`);

  return { success: true, message: "The comment is successfully deleted" };
};
