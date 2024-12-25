"use client";

import { Category } from "@/services/categories/dto/get.categories.dto";
import { CategoriesRadioGroup } from "@/shared/components";
import { Button, Container, Loader, TextArea, TextField } from "@/shared/ui";
import { Suspense, useActionState } from "react";
import { createArticle } from "../_actions/create.article";
import dynamic from "next/dynamic";

const CustomMDEditor = dynamic(
  () => import("@/shared/components/custom.md.editor"),
  {
    ssr: false,
  }
);

type CreateArticleFormProps = {
  categories: Category[];
};

const CreateArticleForm = ({ categories }: CreateArticleFormProps) => {
  const [state, formAction, isPending] = useActionState(createArticle, null);

  return (
    <section>
      <Container className="py-20">
        <form action={formAction}>
          <h1 className="mb-12 text-center">Creating Article</h1>
          <TextField
            label="Title"
            name="title"
            className="mb-6"
            error={state?.errors?.title?.[0]}
          />
          <CategoriesRadioGroup
            categories={categories}
            error={state?.errors?.categoryId?.[0]}
          />
          <TextArea
            label="Description"
            name="description"
            className="mb-6"
            rows={2}
            error={state?.errors?.description?.[0]}
          />
          <Suspense fallback={null}>
            <CustomMDEditor
              label="Content"
              name="content"
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
            {isPending ? <Loader color="white" size="sm" /> : "Create"}
          </Button>
        </form>
      </Container>
    </section>
  );
};

export default CreateArticleForm;
