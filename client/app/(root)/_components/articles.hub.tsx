import { Container } from "@/shared/ui";
import ArticleRecently from "./articles.recently";
import { Suspense } from "react";
import ArticlesSkeleton from "./articles.skeleton";

type ArticlesHubProps = {
  currentPage: number;
};

const ArticlesHub = ({ currentPage }: ArticlesHubProps) => {
  return (
    <section>
      <Container className="pt-20 pb-32 flex gap-x-20">
        <Suspense
          fallback={<ArticlesSkeleton countItems={6} className="flex-1" />}
        >
          <ArticleRecently currentPage={currentPage} />
        </Suspense>
        <div className="min-w-[362px]">Articles Hub Sidebar</div>
      </Container>
    </section>
  );
};

export default ArticlesHub;
