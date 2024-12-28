"use client";

import { Button, Loader } from "@/shared/ui";
import Modal, { ModalProps } from "@/shared/ui/modal";
import React, { useActionState, useEffect } from "react";
import { deleteArticle } from "../_actions/delete.article";

type DeleteArticleModalProps = ModalProps & {
  articleId: number;
};

const DeleteArticleModal = ({
  articleId,
  ...modalProps
}: DeleteArticleModalProps) => {
  const deleteArticleWithId = deleteArticle.bind(null, articleId);
  const [state, action, isPending] = useActionState(deleteArticleWithId, null);

  useEffect(() => {
    if (state && !state.success) {
      alert(state.message);
    }
  }, [state]);

  return (
    <Modal {...modalProps}>
      <div className="w-[460px]">
        <form>
          <h3 className="mb-8">Do you really want to delete this article?</h3>
          <div className="flex justify-end">
            <Button
              variant="primary"
              size="md"
              formAction={action}
              disabled={isPending}
            >
              {isPending ? <Loader color="white" size="sm" /> : "Delete"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteArticleModal;
