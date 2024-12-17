import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import ArticleItem from "./article.item";

type ArticlesListProps = ComponentProps<"ul"> & {
  data?: unknown[];
};

const ArticlesList = ({
  data,
  className,
  ...otherProps
}: ArticlesListProps) => {
  const classes = cn("flex flex-col space-y-11", className);

  return (
    <ul className={classes} {...otherProps}>
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
    </ul>
  );
};

export default ArticlesList;
