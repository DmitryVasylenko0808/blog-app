import { imagesUrl, nullAvatarUrl } from "@/constants";
import { TopUser } from "@/services/users/dto/get.top.users.dto";
import Image from "next/image";
import Link from "next/link";

type TopAuthorItemProps = {
  author: TopUser;
};

const TopAuthorItem = ({ author }: TopAuthorItemProps) => {
  const userAvatar = author.avatarUrl
    ? `${imagesUrl}/${author.avatarUrl}`
    : nullAvatarUrl!;

  return (
    <li className="flex gap-x-6 items-center">
      <Link href={`/users/${author.id}`}>
        <Image
          width={80}
          height={80}
          className="rounded-full"
          src={userAvatar}
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
