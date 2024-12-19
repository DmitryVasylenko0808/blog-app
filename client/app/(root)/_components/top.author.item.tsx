import { TopUser } from "@/services/users/dto/get.top.users.dto";
import Link from "next/link";

type TopAuthorItemProps = {
  author: TopUser;
};

const TopAuthorItem = ({ author }: TopAuthorItemProps) => {
  return (
    <li className="flex gap-x-6 items-center">
      <Link href={`/users/${author.id}`}>
        <img
          width={80}
          height={80}
          className="rounded-full"
          src="https://cdn5.vectorstock.com/i/1000x1000/43/94/default-avatar-photo-placeholder-icon-grey-vector-38594394.jpg"
          alt="user avatar"
        />
      </Link>

      <div>
        <h4 className="mb-2">
          <Link href={`/users/${author.id}`}>{author.fullname}</Link>
        </h4>
        <p className="text-xs text-text-tag">
          <Link href={`/users/${author.id}`}>{author.username}</Link>
        </p>
      </div>
    </li>
  );
};

export default TopAuthorItem;
