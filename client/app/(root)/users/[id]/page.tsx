import { UsersService } from "@/services/users/users.service";
import UserProfile from "./_components/user.profile";
import { notFound } from "next/navigation";

export default async function ProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const userId = Number(params.id);

  const user = await UsersService.getOneUser({ id: userId });

  if (!user.id) {
    notFound();
  }

  return (
    <>
      <UserProfile user={user} />
    </>
  );
}
