import { ArticlesList } from "@/shared/components";
import { Title } from "@/shared/ui";

const ArticlesFeatured = () => {
  return (
    <div>
      <Title
        as="h2"
        filledText="Featured"
        normalText="This Month"
        className="mb-14"
      />
      <ArticlesList className="h-[422px] pr-[268px] overflow-y-auto scrollbar" />
    </div>
  );
};

export default ArticlesFeatured;
