import { notFound } from "next/navigation";
import { verifySession } from "@/app/_lib/session";
import { ArticlesService } from "@/services/articles/articles.service";
import { CommentsService } from "@/services/comments/comments.service";
import ArticleView from "./_components/article.view";
import RelatedArticles from "./_components/related.articles";
import ArticleComments from "./_components/articles.comments";

export default async function ArticlePage(props: {
  params: Promise<{ id?: string }>;
  searchParams: Promise<{ page?: string; sort?: "asc" | "desc" }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const id = Number(params.id);
  const page = Number(searchParams?.page || "1");
  const sort = searchParams?.sort || "desc";

  const data = await ArticlesService.getOne({ id });

  if (data.statusCode === 404) {
    notFound();
  }

  const session = await verifySession();
  const isUserArticle = Number(session?.userId) === data.authorId;

  const relatedArticles = await ArticlesService.getRelated({ id });
  const articleComments = await CommentsService.getComments({
    articleId: id,
    page,
    sort,
  });

  return (
    <>
      <ArticleView article={data} userArticle={isUserArticle} />
      <RelatedArticles articles={relatedArticles} />
      <ArticleComments
        comments={articleComments}
        articleId={id}
        page={page}
        sort={sort}
      />
    </>
  );
}
