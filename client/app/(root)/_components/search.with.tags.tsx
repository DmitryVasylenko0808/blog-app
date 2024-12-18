"use client";

import { Category } from "@/services/categories/dto/get.categories.dto";
import { cn } from "@/utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchWithTagsProps = {
  tags: Category[];
};

const SearchWithTags = ({ tags }: SearchWithTagsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoriesIds = searchParams.get("categories_ids");
  const categoriesIdsArr =
    categoriesIds?.split(",").map((item) => Number(item)) || [];

  const handleClickTag = (id: number) => {
    const params = new URLSearchParams(searchParams);
    let updatedCategoriesIds: string;

    params.delete("page");

    if (!categoriesIdsArr?.includes(id)) {
      updatedCategoriesIds = [...categoriesIdsArr, id]
        .map((item) => item.toString())
        .join(",");

      params.set("categories_ids", updatedCategoriesIds);
    } else {
      updatedCategoriesIds = categoriesIdsArr
        .filter((item) => item !== id)
        .map((item) => item.toString())
        .join(",");

      if (!updatedCategoriesIds.length) {
        params.delete("categories_ids");
      } else {
        params.set("categories_ids", updatedCategoriesIds);
      }
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <ul className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <li
          className={cn(
            "inline-block px-5 py-2.5 text-outline border border-outline rounded-md cursor-pointer",
            {
              "bg-primary-300 border-primary-300 text-white":
                categoriesIdsArr?.includes(tag.id),
            }
          )}
          key={tag.id}
          onClick={() => handleClickTag(tag.id)}
        >
          {tag.title}
        </li>
      ))}
    </ul>
  );
};

export default SearchWithTags;
