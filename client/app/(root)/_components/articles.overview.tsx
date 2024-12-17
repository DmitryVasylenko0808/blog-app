import { Container } from "@/shared/ui";
import { Suspense } from "react";
import ArticlesFeatured from "./articles.featured";
import ArticlesSkeleton from "./articles.skeleton";

const ArticlesOverview = () => {
  return (
    <section className="bg-primary-100">
      <Container className="py-20 flex gap-x-12">
        <Suspense
          fallback={
            <ArticlesSkeleton countItems={2} className="flex-1 pr-[268px]" />
          }
        >
          <ArticlesFeatured />
        </Suspense>
        <div className="min-w-[362px]"></div>
      </Container>
    </section>
  );
};

export default ArticlesOverview;
