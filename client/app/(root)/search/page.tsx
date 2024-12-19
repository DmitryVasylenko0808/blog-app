import { ArticlesService } from "@/services/articles/articles.service";
import SearchedArticles from "./_components/searched.articles";

export default async function SearchPage(props: {
  searchParams: Promise<{ title?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const title = searchParams?.title;
  const page = Number(searchParams?.page || "1");

  const searchedArticles = await ArticlesService.getSearched({ title, page });

  return <SearchedArticles data={searchedArticles} page={page} title={title} />;
}
