import { ArticlesSkeleton } from "@/app/(root)/_components";
import { Container } from "@/shared/ui";

export default function LoadingCategoryArticlePage() {
  return (
    <Container className="py-20">
      <ArticlesSkeleton countItems={6} />
    </Container>
  );
}
