"use client";

import { useActionState, useEffect } from "react";
import Modal, { ModalProps } from "@/shared/ui/modal";
import Link from "next/link";
import { Button, Loader, TextArea } from "@/shared/ui";
import { replyComment } from "../_actions/reply.comment";
import { ArticleComment } from "@/services/comments/dto/get.comments.dto";
import { imagesUrl, nullAvatarUrl } from "@/constants";
import Image from "next/image";

type ReplyCommentModalProps = ModalProps & {
  comment: ArticleComment;
};

const ReplyCommentModal = ({
  comment,
  ...modalProps
}: ReplyCommentModalProps) => {
  const replyCommentWithId = replyComment.bind(
    null,
    comment.articleId,
    comment.id
  );
  const [state, formAction, isPending] = useActionState(
    replyCommentWithId,
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

  const userAvatar = comment.user.avatarUrl
    ? `${imagesUrl}/${comment.user.avatarUrl}`
    : nullAvatarUrl!;

  return (
    <Modal {...modalProps}>
      <div className="w-[560px]">
        <h3 className="mb-10">Replying Comment</h3>
        <div className="mb-10">
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
              </div>
              <div>
                <p>{comment.text}</p>
              </div>
            </div>
          </div>
        </div>
        <form action={formAction}>
          <TextArea
            rows={5}
            placeholder="Reply comment"
            name="text"
            error={state?.errors?.text?.[0]}
            className="mb-6"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isPending}
            >
              {isPending ? <Loader color="white" size="sm" /> : "Reply"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ReplyCommentModal;
