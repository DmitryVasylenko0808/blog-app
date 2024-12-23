import { ArticlesService } from "@/services/articles/articles.service";
import { ArticlesList } from "@/shared/components";
import { Container, Title } from "@/shared/ui";

type RelatedArticlesProps = {
  articleId: number;
};

const RelatedArticles = async ({ articleId }: RelatedArticlesProps) => {
  const articles = await ArticlesService.getRelated({ id: articleId });

  if (!articles || !articles.length) {
    return null;
  }

  return (
    <section>
      <Container className="pb-20">
        <Title
          as="h2"
          filledText="See Related"
          normalText="Articles"
          className="mb-14"
        />
        <ArticlesList data={articles} />
      </Container>
    </section>
  );
};

export default RelatedArticles;
