import { GetCategoryArticlesDto } from "@/services/categories/dto/get.category.articles.dto";
import { ArticlesList, Pagination, ResultPanel } from "@/shared/components";
import { Container } from "@/shared/ui";

type CategoryArticlesProps = {
  data: GetCategoryArticlesDto;
  page: number;
};

const CategoryArticles = ({ data, page }: CategoryArticlesProps) => {
  return (
    <Container className="pt-20 pb-24">
      <ResultPanel value={data?.data[0].category.title} />
      <ArticlesList data={data.data} />
      <Pagination totalPages={data.totalPages} currentPage={page} />
    </Container>
  );
};

export default CategoryArticles;
