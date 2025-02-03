import { CommentsService } from "@/services/comments/comments.service";
import {
  ArticleComment,
  GetArticleCommentsDto,
} from "@/services/comments/dto/get.comments.dto";
import { Container, Title } from "@/shared/ui";
import ArticleCommentItem from "./article.comment.item";
import { Pagination } from "@/shared/components";
import SortComments from "./sort.comments";
import ArticleCommentsForm from "./article.comments.form";
import { verifySession } from "@/app/_lib/session";

type ArticleCommentsProps = {
  comments: GetArticleCommentsDto;
  articleId: number;
  page: number;
  sort: "asc" | "desc";
};

const ArticleComments = async ({
  comments,
  articleId,
  page,
  sort,
}: ArticleCommentsProps) => {
  const session = await verifySession();
  const currentUserId = Number(session?.userId);

  return (
    <Container className="pb-20">
      <Title as="h2" normalText="Comments" className="mb-14" />
      <ArticleCommentsForm articleId={articleId} />
      <SortComments sort={sort} />
      <ul className="flex flex-col gap-y-10">
        {comments.data.map((comment: ArticleComment) => (
          <ArticleCommentItem
            comment={comment}
            key={comment.id}
            currentUserId={currentUserId}
          />
        ))}
      </ul>
      <Pagination totalPages={comments.totalPages} currentPage={page} />
    </Container>
  );
};

export default ArticleComments;
