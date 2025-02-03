"use client";

import { useEffect, useState } from "react";
import { ArticleComment } from "@/services/comments/dto/get.comments.dto";
import { fetchReplies } from "../_actions/fetch.replies";
import ArticleCommentItem from "./article.comment.item";
import { Loader } from "@/shared/ui";

type CommentRepliesProps = {
  comment: ArticleComment;
  currentUserId?: number;
};

const CommentReplies = ({ comment, currentUserId }: CommentRepliesProps) => {
  const [data, setData] = useState<ArticleComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchReplies({ articleId: comment.articleId, commentId: comment.id })
      .then((data) => setData(data))
      .catch(() => alert("Something went wrong"))
      .finally(() => setIsLoading(false));
  }, [comment]);

  if (isLoading) {
    return (
      <div className="py-6">
        <Loader color="secondary" size="sm" />
      </div>
    );
  }

  return (
    <div className="py-6 flex flex-col space-y-4">
      {data.map((c) => (
        <ArticleCommentItem
          comment={c}
          currentUserId={currentUserId}
          answer
          key={c.id}
        />
      ))}
    </div>
  );
};

export default CommentReplies;
