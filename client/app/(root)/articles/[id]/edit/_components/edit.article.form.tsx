"use client";

import { Category } from "@/services/categories/dto/get.categories.dto";
import { CategoriesRadioGroup } from "@/shared/components";
import { Button, Container, Loader, TextArea, TextField } from "@/shared/ui";
import { Suspense, useActionState } from "react";
import { editArticle } from "../_actions/edit.article";
import { ArticleDetails } from "@/services/articles/dto/get.one.article.dto";
import dynamic from "next/dynamic";

const CustomMDEditor = dynamic(
  () => import("@/shared/components/custom.md.editor"),
  {
    ssr: false,
  }
);

type EditArticleFormProps = {
  article: ArticleDetails;
  categories: Category[];
};

const EditArticleForm = ({ article, categories }: EditArticleFormProps) => {
  const editArticleWithId = editArticle.bind(null, article.id);
  const [state, formAction, isPending] = useActionState(
    editArticleWithId,
    null
  );

  return (
    <section>
      <Container className="py-20">
        <form action={formAction}>
          <h1 className="mb-12 text-center">Editing Article</h1>
          <TextField
            label="Title"
            name="title"
            defaultValue={article.title}
            className="mb-6"
            error={state?.errors?.title?.[0]}
          />
          <CategoriesRadioGroup
            categories={categories}
            defaultCheckedCategoryId={article.categoryId}
            error={state?.errors?.categoryId?.[0]}
          />
          <TextArea
            label="Description"
            name="description"
            defaultValue={article.description}
            className="mb-6"
            rows={2}
            error={state?.errors?.description?.[0]}
          />
          <Suspense fallback={null}>
            <CustomMDEditor
              label="Content"
              name="content"
              defaultValue={article.content}
              className="mb-6"
              error={state?.errors?.content?.[0]}
            />
          </Suspense>
          <p className="my-4 text-center text-text-error">
            {state?.errors?.root}
          </p>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? <Loader color="white" size="sm" /> : "Edit"}
          </Button>
        </form>
      </Container>
    </section>
  );
};

export default EditArticleForm;
