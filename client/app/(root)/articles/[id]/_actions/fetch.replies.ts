"use server";

import {
  CommentsService,
  GetRepliesParams,
} from "@/services/comments/comments.service";

export const fetchReplies = async ({
  articleId,
  commentId,
}: GetRepliesParams) => {
  const data = await CommentsService.getReplies({ articleId, commentId });

  return data;
};
