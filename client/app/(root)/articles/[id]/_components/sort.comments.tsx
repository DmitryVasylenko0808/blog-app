"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SortCommentsProps = {
  sort: "asc" | "desc";
};

const SortComments = ({ sort }: SortCommentsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const sortMap = new Map<"asc" | "desc", string>();
  sortMap.set("asc", "Oldest");
  sortMap.set("desc", "Newest");

  const handleClick = (sort: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams);

    params.delete("page");
    params.set("sort", sort);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-7 flex justify-end">
      <div className="relative">
        <span className="flex items-center gap-x-3 cursor-pointer peer">
          Sort by: {sortMap.get(sort)}
        </span>
        <div className="hidden absolute top-full left-0 z-10 min-w-full py-1.5 hover:block peer-hover:block">
          <div className="min-w-full py-1 bg-white shadow-xl">
            <ul className="flex flex-col text-sm text-text-meta">
              <li
                onClick={() => handleClick("asc")}
                className="py-1.5 px-3 cursor-pointer hover:bg-primary-100"
              >
                {sortMap.get("asc")}
              </li>
              <li
                onClick={() => handleClick("desc")}
                className="py-1.5 px-3 cursor-pointer hover:bg-primary-100"
              >
                {sortMap.get("desc")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortComments;
