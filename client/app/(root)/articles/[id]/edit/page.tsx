import { ArticlesService } from "@/services/articles/articles.service";
import EditArticleForm from "./_components/edit.article.form";
import { CategoriesService } from "@/services/categories/categories.service";

export default async function EditArticlePage(props: {
  params: Promise<{ id?: string }>;
}) {
  const params = await props.params;
  const articleId = Number(params.id);

  const article = await ArticlesService.getOne({ id: articleId });
  const categories = await CategoriesService.getCategories();

  return <EditArticleForm article={article} categories={categories} />;
}
