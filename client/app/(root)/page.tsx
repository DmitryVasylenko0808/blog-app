import { ArticlesHub, ArticlesOverview } from "./_components";

export default async function HomePage(props: {
  searchParams: Promise<{ page?: string; categories_ids?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page || "1");
  const categories_ids = searchParams?.categories_ids;

  return (
    <>
      <ArticlesOverview />
      <ArticlesHub currentPage={page} categoriesIds={categories_ids} />
    </>
  );
}
