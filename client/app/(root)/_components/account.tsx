import { UsersService } from "@/services/users/users.service";
import AccountMenu from "./account.menu";

type AccountProps = {
  userId: string;
};

const Account = async ({ userId }: AccountProps) => {
  const currentUser = await UsersService.getOneUser({ id: Number(userId) });

  return (
    <div className="relative">
      <div className="flex items-center gap-x-3 cursor-pointer peer">
        <div>
          <span>{currentUser.username}</span>
        </div>
        <div className="w-8 h-8">
          <img
            src="https://cdn5.vectorstock.com/i/1000x1000/43/94/default-avatar-photo-placeholder-icon-grey-vector-38594394.jpg"
            alt="user avatar"
            className="w-full h-full rounded-full"
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
