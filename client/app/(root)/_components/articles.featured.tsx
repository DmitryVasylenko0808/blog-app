import { ArticlesService } from "@/services/articles/articles.service";
import { ArticlesList, NoData } from "@/shared/components";
import { Title } from "@/shared/ui";

const ArticlesFeatured = async () => {
  const articles = await ArticlesService.getFeatured();

  return (
    <div>
      <Title
        as="h2"
        filledText="Featured"
        normalText="This Month"
        className="mb-14"
      />
      {articles.length ? (
        <ArticlesList
          data={articles}
          className="h-[422px] pr-[268px] overflow-y-auto scrollbar"
        />
      ) : (
        <NoData text="No Articles" />
      )}
    </div>
  );
};

export default ArticlesFeatured;
