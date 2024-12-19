import { CategoriesService } from "@/services/categories/categories.service";
import CategoryArticles from "./_components/category.articles";

export default async function CategoryArticlesPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const id = Number(params.id);
  const page = Number(searchParams?.page || "1");

  const categoryArticles = await CategoriesService.getArticlesByCategory({
    id,
    page,
  });

  return <CategoryArticles data={categoryArticles} page={page} />;
}
