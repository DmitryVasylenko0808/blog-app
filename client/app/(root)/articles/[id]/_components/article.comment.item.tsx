"use client";

import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import Link from "next/link";
import ArticleCommentActions from "./article.comment.actions";
import CommentReplies from "./comment.replies";
import ReplyCommentModal from "./reply.comment.modal";
import ReplyControl from "./reply.control";
import { ArticleComment } from "@/services/comments/dto/get.comments.dto";
import { imagesUrl, nullAvatarUrl } from "@/constants";
import Image from "next/image";

type ArticleCommentItemProps = {
  comment: ArticleComment;
  currentUserId?: number;
  answer?: boolean;
};

const ArticleCommentItem = ({
  comment,
  currentUserId,
  answer,
}: ArticleCommentItemProps) => {
  const replyModal = useModal();
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  const handleClickToggleAnswers = () => setShowAnswers((prev) => !prev);

  const date = new Date(comment.createdAt);
  const isUserComment = currentUserId === comment.userId;

  const userAvatar = comment.user.avatarUrl
    ? `${imagesUrl}/${comment.user.avatarUrl}`
    : nullAvatarUrl!;

  return (
    <>
      <div className="block">
        <div className="flex gap-x-4">
          <div>
            <Link href={`/users/${comment.userId}`}>
              <Image
                width={70}
                height={70}
                src={userAvatar}
                alt="user avatar"
                className="rounded-full"
              />
            </Link>
          </div>
          <div className="flex-1">
            <div className="flex mb-4">
              <div className="flex-1">
                <h3>
                  <Link href={`/users/${comment.userId}`}>
                    {comment.user.fullname}
                  </Link>
                </h3>
                <Link
                  href={`/users/${comment.userId}`}
                  className="text-sm text-text-tag"
                >
                  {comment.user.username}
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-tag">
                  {date.toLocaleDateString()}
                </span>
                {isUserComment && <ArticleCommentActions comment={comment} />}
              </div>
            </div>
            <div className="mb-5">
              <p>{comment.text}</p>
            </div>
            {!answer && (
              <ReplyControl
                comment={comment}
                showAnswers={showAnswers}
                onClickReply={replyModal.onOpen}
                onToggleReplies={handleClickToggleAnswers}
              />
            )}
            {showAnswers && (
              <CommentReplies currentUserId={currentUserId} comment={comment} />
            )}
          </div>
        </div>
      </div>

      <ReplyCommentModal
        comment={comment}
        open={replyModal.open}
        onClose={replyModal.onClose}
      />
    </>
  );
};

export default ArticleCommentItem;
