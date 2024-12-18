"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui";
import { MoveLeft, MoveRight } from "lucide-react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClickPage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-20">
      <ul className="flex space-x-4">
        {currentPage > 1 && (
          <li className="">
            <Button
              variant="secondary"
              size="sm"
              className="min-w-10 py-3 px-4"
              onClick={() => handleClickPage(currentPage - 1)}
            >
              <MoveLeft size={16} /> Prev.
            </Button>
          </li>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <li className="" key={i}>
            <Button
              variant={i + 1 === currentPage ? "primary" : "secondary"}
              disabled={i + 1 === currentPage}
              size="sm"
              className="min-w-10 py-3 px-4"
              onClick={() => handleClickPage(i + 1)}
            >
              {i + 1}
            </Button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li className="">
            <Button
              variant="secondary"
              size="sm"
              className="min-w-10 py-3 px-4"
              onClick={() => handleClickPage(currentPage + 1)}
            >
              Next <MoveRight size={16} />
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
