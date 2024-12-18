import { ArticlesService } from "@/services/articles/articles.service";
import { ArticlesList } from "@/shared/components";
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
      <ArticlesList
        data={articles}
        className="h-[422px] pr-[268px] overflow-y-auto scrollbar"
      />
    </div>
  );
};

export default ArticlesFeatured;
