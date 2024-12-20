import { UsersService } from "@/services/users/users.service";
import UserProfile from "./_components/user.profile";

export default async function ProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const userId = Number(params.id);

  const user = await UsersService.getOneUser({ id: userId });

  return (
    <>
      <UserProfile user={user} />
    </>
  );
}
