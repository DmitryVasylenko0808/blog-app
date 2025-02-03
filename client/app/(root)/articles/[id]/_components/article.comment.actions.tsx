"use client";

import { useModal } from "@/hooks/useModal";
import { ArticleComment } from "@/services/comments/dto/get.comments.dto";
import { EllipsisVertical, PencilLine, Trash2 } from "lucide-react";
import DeleleCommentModal from "./delete.comment.modal";
import EditCommentModal from "./edit.comment.modal";

type ArticleCommentActionsProps = {
  comment: ArticleComment;
};

const ArticleCommentActions = ({ comment }: ArticleCommentActionsProps) => {
  const editModal = useModal();
  const deleteModal = useModal();

  return (
    <>
      <div className="relative">
        <span className="flex items-center gap-x-3 text-text-meta cursor-pointer peer">
          <EllipsisVertical />
        </span>
        <div className="hidden absolute top-full left-0 z-10 min-w-max py-1.5 hover:block peer-hover:block">
          <div className="min-w-max py-1 bg-white shadow-xl">
            <ul className="flex flex-col text-sm text-text-meta">
              <li
                onClick={editModal.onOpen}
                className="flex gap-x-1 py-1.5 px-3 cursor-pointer hover:bg-primary-100"
              >
                <PencilLine size={22} /> Edit
              </li>
              <li
                onClick={deleteModal.onOpen}
                className="flex gap-x-1 py-1.5 px-3 cursor-pointer hover:bg-primary-100"
              >
                <Trash2 size={22} /> Delete
              </li>
            </ul>
          </div>
        </div>
      </div>

      <EditCommentModal
        comment={comment}
        open={editModal.open}
        onClose={editModal.onClose}
      />
      <DeleleCommentModal
        comment={comment}
        open={deleteModal.open}
        onClose={deleteModal.onClose}
      />
    </>
  );
};

export default ArticleCommentActions;
