import { Suspense } from "react";
import { ArticlesService } from "@/services/articles/articles.service";
import { notFound } from "next/navigation";
import ArticleView from "./_components/article.view";
import RelatedArticles from "./_components/related.articles";
import { ArticlesSkeleton } from "../../_components";

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
      <Suspense
        fallback={
          <ArticlesSkeleton
            countItems={2}
            className="mx-auto max-w-container pb-20"
          />
        }
      >
        <RelatedArticles articleId={id} />
      </Suspense>
    </>
  );
}
