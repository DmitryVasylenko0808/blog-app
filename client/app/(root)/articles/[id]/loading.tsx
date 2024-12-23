import { Container } from "@/shared/ui";
import ArticleViewSkeleton from "./_components/article.view.skeleton";

export default function LoadingArticlePage() {
  return (
    <Container className="py-20">
      <ArticleViewSkeleton />
    </Container>
  );
}
