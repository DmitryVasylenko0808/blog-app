import { ArticlesHub, ArticlesOverview } from "./_components";

export default async function HomePage(props: {
  searchParams: Promise<{ page: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page || "1");

  return (
    <>
      <ArticlesOverview />
      <ArticlesHub currentPage={page} />
    </>
  );
}
