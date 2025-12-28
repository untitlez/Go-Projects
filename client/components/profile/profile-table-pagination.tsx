"use client";

import { Button } from "@/components/ui/button";

interface ProfileTablePaginationProps {
  pagination?: number;
}

export const ProfileTablePagination = ({
  pagination,
}: ProfileTablePaginationProps) => {
  return (
    <div className="flex flex-1 items-center justify-between mb-4">
      <div>1 of {pagination} selected.</div>
      <div className="space-x-2">
        <Button variant="outline" size="sm" className="cursor-pointer">
          Previous
        </Button>
        <Button variant="outline" size="sm" className="cursor-pointer">
          Next
        </Button>
      </div>
    </div>
  );
};
