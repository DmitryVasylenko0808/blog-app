import { CalendarDays, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ArticleItemProps = {
  data?: unknown;
};

const ArticleItem = ({ data }: ArticleItemProps) => {
  return (
    <li className="block">
      <article>
        <span className="inline-block mb-2 px-2 py-1 bg-primary-200 rounded text-xs text-text-tag">
          Travel
        </span>
        <h3 className="mb-5">
          <Link href="/post">
            I Created a Developer Rap Video - Here's What I Learned from it.
            Check it out
          </Link>
        </h3>
        <div className="mb-4 flex gap-x-2.5 items-center text-xs text-text-meta">
          <Link href="/" className="inline-flex items-center">
            <img
              width={18}
              height={18}
              src="https://cdn5.vectorstock.com/i/1000x1000/43/94/default-avatar-photo-placeholder-icon-grey-vector-38594394.jpg"
              alt="user avatar"
              className="inline rounded-full mr-2"
            />
            <span>Jessica Koli</span>
          </Link>
          <div>|</div>
          <div className="inline-flex items-center">
            <CalendarDays size={16} className="mr-1.5" />
            <span>22 December 2024</span>
          </div>
          <div>|</div>
          <div className="inline-flex items-center">
            <Eye size={16} className="mr-1.5" />
            <span>100 views</span>
          </div>
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
          temporibus veniam maxime, doloremque facere animi eaque reiciendis
          distinctio unde nobis, reprehenderit repudiandae consequatur iure
          deleniti voluptate, pariatur vitae ut cum?
        </p>
      </article>
    </li>
  );
};

export default ArticleItem;
