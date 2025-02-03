import { verifySession } from "@/app/_lib/session";
import { UserDetails } from "@/services/users/dto/get.one.user.dto";
import { Container } from "@/shared/ui";
import { imagesUrl, nullAvatarUrl } from "@/constants";
import EditProfile from "./edit.profile";
import Image from "next/image";

type UserProfileProps = {
  user: UserDetails;
};

const UserProfile = async ({ user }: UserProfileProps) => {
  const session = await verifySession();
  const userAvatar = user.avatarUrl
    ? `${imagesUrl}/${user.avatarUrl}`
    : nullAvatarUrl!;
  const isCurrentUser = Number(session?.userId) === user.id;

  return (
    <div className="bg-primary-100">
      <Container className="pt-20 pb-24">
        <div className="flex gap-x-9">
          <div className="min-w-[520px] h-[520px]">
            <Image
              width={520}
              height={520}
              className="w-full h-full object-cover"
              src={userAvatar}
              alt="Profile avatar"
            />
          </div>
          <div className="flex-auto">
            {isCurrentUser && <EditProfile user={user} />}
            <h2 className="mt-9 mb-6">{user.fullname}</h2>
            <p>{user.about}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;
