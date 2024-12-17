import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import ArticleItem from "./article.item";
import { Article } from "@/app/(root)/_lib/services/dto/get.featured.articles.dto";

type ArticlesListProps = ComponentProps<"ul"> & {
  data: Article[];
};

const ArticlesList = ({
  data = [],
  className,
  ...otherProps
}: ArticlesListProps) => {
  const classes = cn("flex flex-col space-y-11", className);

  return (
    <ul className={classes} {...otherProps}>
      {data.map((article) => (
        <ArticleItem data={article} key={article.id} />
      ))}
    </ul>
  );
};

export default ArticlesList;
