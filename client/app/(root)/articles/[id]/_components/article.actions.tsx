"use client";

import { useModal } from "@/hooks/useModal";
import { Button } from "@/shared/ui";
import { PencilLine, Trash2 } from "lucide-react";
import DeleteArticleModal from "./delete.article.modal";

type ArticleActionsProps = {
  articleId: number;
};

const ArticleActions = ({ articleId }: ArticleActionsProps) => {
  const deleteModal = useModal();

  return (
    <div className="flex justify-end gap-x-6">
      <Button variant="tertiary">
        <PencilLine /> Edit
      </Button>
      <Button variant="tertiary" onClick={deleteModal.onOpen}>
        <Trash2 /> Delete
      </Button>

      <DeleteArticleModal
        articleId={articleId}
        open={deleteModal.open}
        onClose={deleteModal.onClose}
      />
    </div>
  );
};

export default ArticleActions;
