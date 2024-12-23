"use client";

import { Button } from "@/shared/ui";
import Modal, { ModalProps } from "@/shared/ui/modal";
import React from "react";
import { deleteArticle } from "../_actions/delete.article";

type DeleteArticleModalProps = ModalProps & {
  articleId: number;
};

const DeleteArticleModal = ({
  articleId,
  ...modalProps
}: DeleteArticleModalProps) => {
  const handleClickDelete = async () => {
    const res = await deleteArticle(articleId);

    if (!res.success) {
      alert(res.message);
    }
  };

  return (
    <Modal {...modalProps}>
      <div className="w-[460px]">
        <h3 className="mb-8">Do you really want to delete this article?</h3>
        <div className="flex justify-end">
          <Button variant="primary" size="md" onClick={handleClickDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteArticleModal;
