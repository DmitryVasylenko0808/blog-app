"use server";

import { ArticlesService } from "@/services/articles/articles.service";
import { redirect } from "next/navigation";

type DeleteArticleState = {
  success: boolean;
  message: string;
} | null;

export const deleteArticle = async (
  id: number,
  prevState: DeleteArticleState
): Promise<DeleteArticleState> => {
  const res = await ArticlesService.delete({ id });

  if (res.statusCode >= 400) {
    return {
      success: false,
      message: res.message,
    };
  }

  redirect("/");
};
