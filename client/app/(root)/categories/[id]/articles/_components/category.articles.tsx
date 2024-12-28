import { GetCategoryArticlesDto } from "@/services/categories/dto/get.category.articles.dto";
import {
  ArticlesList,
  NoData,
  Pagination,
  ResultPanel,
} from "@/shared/components";
import { Container } from "@/shared/ui";

type CategoryArticlesProps = {
  data: GetCategoryArticlesDto;
  page: number;
};

const CategoryArticles = ({ data, page }: CategoryArticlesProps) => {
  return (
    <Container className="pt-20 pb-24">
      <ResultPanel
        title={
          <span>
            Articles by category{" "}
            <span className="font-semibold">
              {data?.data[0]?.category.title}
            </span>
          </span>
        }
      />
      {data.data.length ? (
        <ArticlesList data={data.data} />
      ) : (
        <NoData text="No Articles" />
      )}
      <Pagination totalPages={data.totalPages} currentPage={page} />
    </Container>
  );
};

export default CategoryArticles;
