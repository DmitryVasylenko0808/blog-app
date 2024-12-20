import { Suspense } from "react";
import { notFound } from "next/navigation";
import { UsersService } from "@/services/users/users.service";
import { ArticlesSkeleton } from "../../_components";
import UserProfile from "./_components/user.profile";
import UserArticles from "./_components/user.articles";

export default async function ProfilePage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const userId = Number(params.id);
  const page = Number(searchParams?.page || "1");

  const user = await UsersService.getOneUser({ id: userId });

  if (!user.id) {
    notFound();
  }

  return (
    <>
      <UserProfile user={user} />
      <Suspense
        fallback={
          <ArticlesSkeleton
            countItems={4}
            className="max-w-container mx-auto py-20"
          />
        }
      >
        <UserArticles userId={userId} page={page} />
      </Suspense>
    </>
  );
}
