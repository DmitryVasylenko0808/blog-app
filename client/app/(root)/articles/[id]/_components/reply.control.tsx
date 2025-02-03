"use client";

import { Button } from "@/shared/ui";
import { ChevronDown, ChevronUp, Reply } from "lucide-react";
import { ArticleComment } from "@/services/comments/dto/get.comments.dto";

type ReplyControlProps = {
  comment: ArticleComment;
  showAnswers: boolean;

  onClickReply: () => void;
  onToggleReplies: () => void;
};

const ReplyControl = ({
  comment,
  showAnswers,
  onClickReply,
  onToggleReplies,
}: ReplyControlProps) => {
  return (
    <div className="flex items-center gap-x-5">
      <Button
        variant="tertiary"
        className="font-semibold"
        onClick={onClickReply}
      >
        <Reply />
        Reply
      </Button>
      {comment._count.children > 0 && (
        <Button
          variant="tertiary"
          className="text-text-meta"
          onClick={onToggleReplies}
        >
          {!showAnswers ? (
            <span className="inline-flex items-center gap-x-1">
              Show {comment._count.children} answers <ChevronDown />
            </span>
          ) : (
            <span className="inline-flex items-center gap-x-1">
              Hide answers <ChevronUp />
            </span>
          )}
        </Button>
      )}
    </div>
  );
};

export default ReplyControl;
