import { UsersService } from "@/services/users/users.service";
import { ArticlesList, Pagination } from "@/shared/components";
import { Container, Title } from "@/shared/ui";

type UserArticlesProps = {
  userId: number;
  page: number;
};

const UserArticles = async ({ userId, page }: UserArticlesProps) => {
  const userArticles = await UsersService.getUserArticles({ id: userId, page });

  return (
    <section>
      <Container className="pt-20 pb-24">
        <Title
          as="h2"
          filledText="Read"
          normalText="Author Articles"
          className="mb-14"
        />
        <ArticlesList data={userArticles.data} />
        <Pagination totalPages={userArticles.totalPages} currentPage={page} />
      </Container>
    </section>
  );
};

export default UserArticles;
