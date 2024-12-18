import { TopUser } from "@/services/users/dto/get.top.users.dto";

type TopAuthorItemProps = {
  author: TopUser;
};

const TopAuthorItem = ({ author }: TopAuthorItemProps) => {
  return (
    <li className="flex gap-x-6 items-center">
      <img
        width={80}
        height={80}
        className="rounded-full"
        src="https://cdn5.vectorstock.com/i/1000x1000/43/94/default-avatar-photo-placeholder-icon-grey-vector-38594394.jpg"
        alt="user avatar"
      />
      <div>
        <h4 className="mb-2">{author.fullname}</h4>
        <p className="text-xs text-text-tag">{author.username}</p>
      </div>
    </li>
  );
};

export default TopAuthorItem;
