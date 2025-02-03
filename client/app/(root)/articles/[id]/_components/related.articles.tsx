import { Article } from "@/services/articles/dto/get.related.articles.dto";
import { ArticlesList } from "@/shared/components";
import { Container, Title } from "@/shared/ui";

type RelatedArticlesProps = {
  articles: Article[];
};

const RelatedArticles = async ({ articles }: RelatedArticlesProps) => {
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
