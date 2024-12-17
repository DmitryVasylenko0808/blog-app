import { Container } from "@/shared/ui";
import ArticlesFeatured from "./articles.featured";

const ArticlesOverview = () => {
  return (
    <section className="py-20 bg-primary-100">
      <Container className="flex gap-x-12">
        <ArticlesFeatured />
        <div className="min-w-[362px]"></div>
      </Container>
    </section>
  );
};

export default ArticlesOverview;
