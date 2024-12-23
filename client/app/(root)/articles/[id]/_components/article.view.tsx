import { CustomMDX } from "@/app/(root)/_components";
import { ArticleDetails } from "@/services/articles/dto/get.one.article.dto";
import { Container } from "@/shared/ui";
import { CalendarDays, Eye } from "lucide-react";
import Link from "next/link";

type ArticleViewProps = {
  article: ArticleDetails;
};

const ArticleView = async ({ article }: ArticleViewProps) => {
  const date = new Date(article.createdAt);

  return (
    <section>
      <Container className="py-20">
        <article>
          <div className="mb-8">
            <span className="inline-block mb-2 px-2 py-1 bg-primary-200 rounded text-xs text-text-tag">
              {article.category.title}
            </span>
            <h1 className="mb-5">{article.title}</h1>
            <div className="mb-4 flex gap-x-2.5 items-center text-xs text-text-meta">
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
                <CalendarDays size={16} className="mr-1.5" />
                <span>{date.toLocaleDateString()}</span>
              </div>
              <div>|</div>
              <div className="inline-flex items-center">
                <Eye size={16} className="mr-1.5" />
                <span>{article.viewsCount} views</span>
              </div>
            </div>
            <p>{article.description}</p>
          </div>
          <CustomMDX source={article.content} />
        </article>
      </Container>
    </section>
  );
};

export default ArticleView;
