"use server";

import { ArticlesService } from "@/services/articles/articles.service";
import { redirect } from "next/navigation";

export const deleteArticle = async (id: number) => {
  const res = await ArticlesService.delete({ id });

  if (res.error) {
    return res.message;
  }

  console.log(res);

  redirect("/");
};
