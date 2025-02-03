"use client";

import { ArticleComment } from "@/services/comments/dto/get.comments.dto";
import { Button, Loader } from "@/shared/ui";
import Modal, { ModalProps } from "@/shared/ui/modal";
import { useTransition } from "react";
import { deleteComment } from "../_actions/delete.comment";

type DeleleCommentModalProps = ModalProps & {
  comment: ArticleComment;
};

const DeleleCommentModal = ({
  comment,
  ...modalProps
}: DeleleCommentModalProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const res = await deleteComment(comment.articleId, comment.id);

      if (!res.success) {
        alert(res.message);
      }
    });
  };

  return (
    <Modal {...modalProps}>
      <div className="w-[460px]">
        <h3 className="mb-8">Do you really want to delete this comment?</h3>
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="md"
            disabled={isPending}
            onClick={handleClick}
          >
            {isPending ? <Loader color="white" size="sm" /> : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleleCommentModal;
