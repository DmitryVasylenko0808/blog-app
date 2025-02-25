import { imagesUrl, nullAvatarUrl } from "@/constants";
import { Article } from "@/services/articles/dto/get.recently.articles.dto";
import { CalendarDays, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ArticleItemProps = {
  data: Article;
};

const ArticleItem = ({ data }: ArticleItemProps) => {
  const userAvatar = data.author.avatarUrl
    ? `${imagesUrl}/${data.author.avatarUrl}`
    : nullAvatarUrl!;
  const date = new Date(data.createdAt);

  return (
    <li className="block">
      <article>
        <span className="inline-block mb-2 px-2 py-1 bg-primary-200 rounded text-xs text-text-tag">
          {data.category.title}
        </span>
        <h3 className="mb-5">
          <Link href={`/articles/${data.id}`}>{data.title}</Link>
        </h3>
        <div className="mb-4 flex gap-x-2.5 items-center text-xs text-text-meta">
          <Link
            href={`/users/${data.authorId}`}
            className="inline-flex items-center"
          >
            <Image
              width={18}
              height={18}
              src={userAvatar}
              alt="user avatar"
              className="inline rounded-full mr-2"
            />
            <span>{data.author.username}</span>
          </Link>
          <div>|</div>
          <div className="inline-flex items-center">
            <CalendarDays size={16} className="mr-1.5" />
            <span>{date.toLocaleDateString()}</span>
          </div>
          <div>|</div>
          <div className="inline-flex items-center">
            <Eye size={16} className="mr-1.5" />
            <span>{data.viewsCount} views</span>
          </div>
        </div>
        <p>{data.description}</p>
      </article>
    </li>
  );
};

export default ArticleItem;
