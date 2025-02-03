"use client";

import { useActionState, useEffect } from "react";
import { Button, Loader, TextArea } from "@/shared/ui";
import Modal, { ModalProps } from "@/shared/ui/modal";
import { editComment } from "../_actions/edit.comment";
import { ArticleComment } from "@/services/comments/dto/get.comments.dto";

type EditCommentModalProps = ModalProps & {
  comment: ArticleComment;
};

const EditCommentModal = ({
  comment,
  ...modalProps
}: EditCommentModalProps) => {
  const editCommentWithId = editComment.bind(
    null,
    comment.articleId,
    comment.id
  );
  const [state, formAction, isPending] = useActionState(
    editCommentWithId,
    null
  );

  useEffect(() => {
    if (state?.errors?.root) {
      alert(state.errors.root);
      return;
    }

    if (state?.success) {
      modalProps.onClose();
    }
  }, [state]);

  return (
    <Modal {...modalProps}>
      <div className="w-[560px]">
        <h3 className="mb-8">Editing Comment</h3>
        <form action={formAction}>
          <TextArea
            rows={3}
            defaultValue={comment.text}
            error={state?.errors?.text?.[0]}
            name="text"
            className="mb-6"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isPending}
            >
              {isPending ? <Loader color="white" size="sm" /> : "Edit"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditCommentModal;
