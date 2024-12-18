import { Title } from "@/shared/ui";
import ArticlesPopularView from "./articles.popular.view";
import { ArticlesService } from "@/services/articles/articles.service";

const ArticlesPopular = async () => {
  const data = await ArticlesService.getPopular();

  return (
    <div className="min-w-[362px]">
      <Title
        as="h2"
        filledText="Popular"
        normalText="Posted"
        className="mb-14"
      />
      <ArticlesPopularView articles={data} />
    </div>
  );
};

export default ArticlesPopular;
