import { Article } from "@/services/articles/dto/get.popular.articles.dto";
import ArticlesPopularCard from "./articles.popular.card";

type ArticlesPopularViewProps = {
  articles: Article[];
};

const ArticlesPopularView = ({ articles }: ArticlesPopularViewProps) => {
  return (
    <div className="flex flex-col space-y-7">
      {articles.slice(0, 2).map((article) => (
        <ArticlesPopularCard article={article} key={article.id} />
      ))}
    </div>
  );
};

export default ArticlesPopularView;
