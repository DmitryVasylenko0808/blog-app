"use client";

import { useActionState, useEffect } from "react";
import { createComment } from "../_actions/create.comment";
import { Button, Loader, TextArea } from "@/shared/ui";

type ArticleCommentsFormProps = {
  articleId: number;
};

const ArticleCommentsForm = ({ articleId }: ArticleCommentsFormProps) => {
  const createCommentWithArticleId = createComment.bind(null, articleId);
  const [state, formAction, isPending] = useActionState(
    createCommentWithArticleId,
    null
  );

  useEffect(() => {
    if (state?.errors?.root) {
      alert(state.errors.root);
    }
  }, [state]);

  return (
    <form action={formAction} className="mb-10">
      <TextArea
        rows={5}
        className="mb-4"
        placeholder="Leave a comment"
        error={state?.errors?.text?.[0]}
        name="text"
      />
      <div className="flex justify-end">
        <Button variant="primary" size="md" type="submit" disabled={isPending}>
          {isPending ? <Loader color="white" size="sm" /> : "Comment"}
        </Button>
      </div>
    </form>
  );
};

export default ArticleCommentsForm;
