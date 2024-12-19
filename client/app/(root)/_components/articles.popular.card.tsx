import Link from "next/link";
import { Article } from "@/services/articles/dto/get.popular.articles.dto";
import { Eye } from "lucide-react";

type ArticlesPopularCardProps = {
  article: Article;
};

const ArticlesPopularCard = ({ article }: ArticlesPopularCardProps) => {
  return (
    <div className="w-[362px] min-h-[162px] p-6 bg-white">
      <span className="inline-block mb-3 px-2 py-1 bg-primary-200 rounded text-xs text-text-tag">
        {article.category.title}
      </span>
      <h4 className="mb-4">
        <Link href="/">{article.title}</Link>
      </h4>
      <div className="flex gap-x-2.5 items-center text-xs text-text-meta">
        <Link
          href={`/users/${article.authorId}`}
          className="inline-flex items-center"
        >
          <img
            width={18}
            height={18}
            src="https://cdn5.vectorstock.com/i/1000x1000/43/94/default-avatar-photo-placeholder-icon-grey-vector-38594394.jpg"
            alt="user avatar"
            className="inline rounded-full mr-2"
          />
          <span>{article.author.username}</span>
        </Link>
        <div>|</div>
        <div className="inline-flex items-center">
          <Eye size={16} className="mr-1.5" />
          <span>{article.viewsCount} views</span>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPopularCard;
