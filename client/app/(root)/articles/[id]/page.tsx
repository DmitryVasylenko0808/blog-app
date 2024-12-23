import { ArticlesService } from "@/services/articles/articles.service";
import { notFound } from "next/navigation";
import ArticleView from "./_components/article.view";

export default async function ArticlePage(props: {
  params: Promise<{ id?: string }>;
}) {
  const params = await props.params;
  const id = Number(params.id);

  const data = await ArticlesService.getOne({ id });

  if (data.statusCode === 404) {
    notFound();
  }

  return (
    <>
      <ArticleView article={data} />
    </>
  );
}
