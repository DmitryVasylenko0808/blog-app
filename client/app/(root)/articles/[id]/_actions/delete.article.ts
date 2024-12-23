"use server";

import { ArticlesService } from "@/services/articles/articles.service";
import { redirect } from "next/navigation";

type DeleteArticleState = {
  success: boolean;
  message: string;
};

export const deleteArticle = async (id: number) => {
  const res = await ArticlesService.delete({ id });

  if (res.error) {
    return {
      success: false,
      message: res.message,
    } as DeleteArticleState;
  }

  redirect("/");
};
