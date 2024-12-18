import { Container } from "@/shared/ui";
import ArticlesRecently from "./articles.recently";
import { Suspense } from "react";
import ArticlesSkeleton from "./articles.skeleton";
import Categories from "./categories";
import CategoriesSkeleton from "./categories.skeleton";
import TopAuthors from "./top.authors";
import TopAuthorsSkeleton from "./top.authors.skeleton";

type ArticlesHubProps = {
  currentPage: number;
  categoriesIds?: string;
};

const ArticlesHub = ({ currentPage, categoriesIds }: ArticlesHubProps) => {
  return (
    <section>
      <Container className="pt-20 pb-32 flex gap-x-20">
        <Suspense
          fallback={<ArticlesSkeleton countItems={6} className="flex-1" />}
        >
          <ArticlesRecently
            currentPage={currentPage}
            categoriesIds={categoriesIds}
          />
        </Suspense>
        <div className="w-[362px]">
          <Suspense fallback={<TopAuthorsSkeleton />}>
            <TopAuthors />
          </Suspense>
          <Suspense fallback={<CategoriesSkeleton />}>
            <Categories />
          </Suspense>
        </div>
      </Container>
    </section>
  );
};

export default ArticlesHub;
