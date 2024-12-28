"use client";

import { useDebounce } from "@/hooks/useDebonce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GetSearchedArticlesDto } from "@/services/articles/dto/get.searched.articles.dto";
import {
  ResultPanel,
  ArticlesList,
  Pagination,
  NoData,
} from "@/shared/components";
import { Container, TextField } from "@/shared/ui";

type SearchedArticlesProps = {
  data: GetSearchedArticlesDto;
  page: number;
  title?: string;
};

const SearchedArticles = ({ data, page, title }: SearchedArticlesProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = useDebounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.delete("page");

    if (!e.target.value) {
      params.delete("title");
    } else {
      params.set("title", e.target.value);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Container className="pt-20 pb-24">
      <TextField
        label="Title"
        defaultValue={title}
        placeholder="Search articles by title..."
        className="mb-14"
        onChange={handleChange}
      />
      <ResultPanel
        title={
          <span>
            Search result for <span className="font-semibold">{title}</span>
          </span>
        }
      />
      {data.data.length ? (
        <ArticlesList data={data.data} />
      ) : (
        <NoData text="No Articles" />
      )}
      <Pagination totalPages={data.totalPages} currentPage={page} />
    </Container>
  );
};

export default SearchedArticles;
