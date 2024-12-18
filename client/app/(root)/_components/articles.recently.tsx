import { ArticlesService } from "@/services/articles/articles.service";
import { ArticlesList, Pagination } from "@/shared/components";
import { Title } from "@/shared/ui";

type ArticleRecentlyProps = {
  currentPage: number;
};

const ArticleRecently = async ({ currentPage }: ArticleRecentlyProps) => {
  const data = await ArticlesService.getRecently({ page: currentPage });

  return (
    <div className="flex-1">
      <Title
        as="h2"
        filledText="Recently"
        normalText="Posted"
        className="mb-14"
      />
      <ArticlesList data={data.data} />
      <Pagination totalPages={data.totalPages} currentPage={currentPage} />
    </div>
  );
};

export default ArticleRecently;
