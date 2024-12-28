import { Title } from "@/shared/ui";
import ArticlesPopularView from "./articles.popular.view";
import { ArticlesService } from "@/services/articles/articles.service";
import { NoData } from "@/shared/components";

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
      {data.length ? (
        <ArticlesPopularView articles={data} />
      ) : (
        <NoData text="No Articles" />
      )}
    </div>
  );
};

export default ArticlesPopular;
