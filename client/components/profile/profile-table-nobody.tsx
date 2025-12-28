"use client";

import { FolderX } from "lucide-react";

import { TableCell, TableRow } from "@/components/ui/table";

interface ProfileTableNoBodyProps {
  colSpan: number;
}

export const ProfileTableNoBody = ({ colSpan }: ProfileTableNoBodyProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="justify-items-center pt-8">
        <span className="flex items-center gap-2 capitalize">
          <FolderX className="size-5" />
          no data
        </span>
      </TableCell>
    </TableRow>
  );
};
