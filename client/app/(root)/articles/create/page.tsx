import { CategoriesService } from "@/services/categories/categories.service";
import CreateArticleForm from "./_components/create.article.form";

export default async function CreateArticlePage() {
  const categories = await CategoriesService.getCategories();

  return <CreateArticleForm categories={categories} />;
}
