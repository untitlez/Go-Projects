"use client";

import { Button } from "@/components/ui/button";

interface ProfileTablePaginationProps {
  prev?: number;
  next?: number;
  last?: boolean;
  page: number;
  setPage: (page: number) => void;
}

export const ProfileTablePagination = ({
  prev,
  next,
  last,
  page,
  setPage,
}: ProfileTablePaginationProps) => {
  return (
    <div className="flex flex-1 items-center justify-between mb-4">
      <div>
        {prev} of {next} selected.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer active:scale-95"
          disabled={prev === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer active:scale-95"
          disabled={last}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
