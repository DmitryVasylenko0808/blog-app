import { UsersService } from "@/services/users/users.service";
import AccountMenu from "./account.menu";
import { imagesUrl, nullAvatarUrl } from "@/constants";
import Image from "next/image";

type AccountProps = {
  userId: string;
};

const Account = async ({ userId }: AccountProps) => {
  const currentUser = await UsersService.getOneUser({ id: Number(userId) });
  const userAvatar = currentUser.avatarUrl
    ? `${imagesUrl}/${currentUser.avatarUrl}`
    : nullAvatarUrl!;

  return (
    <div className="relative">
      <div className="flex items-center gap-x-3 cursor-pointer peer">
        <div>
          <span>{currentUser.username}</span>
        </div>
        <div className="w-8 h-8">
          <Image
            src={userAvatar}
            alt="user avatar"
            className="w-full h-full rounded-full"
            width={32}
            height={32}
          />
        </div>
      </div>
      <div className="hidden absolute top-full left-0 z-10 min-w-max py-1.5 hover:block peer-hover:block">
        <AccountMenu user={currentUser} />
      </div>
    </div>
  );
};

export default Account;
