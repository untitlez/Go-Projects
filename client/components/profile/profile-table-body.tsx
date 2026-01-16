"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Routes } from "@/lib/routes";
import { sessionType } from "@/validators/session.validator";
import { profileType } from "@/validators/profile.validator";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProfileTableBodyProps {
  allProfile?: profileType[];
  session?: sessionType;
  index: number;
  onDelete: (value: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const ProfileTableBody = ({
  allProfile,
  session,
  index,
  onDelete,
  open,
  setOpen,
}: ProfileTableBodyProps) => {
  const router = useRouter();
  const total = Number(allProfile?.length);

  return (
    <>
      {allProfile?.map((item, i) => (
        <TableRow
          key={i}
          className="border-b cursor-pointer"
          onClick={() => router.push(Routes.profile.list + item.user_id)}
        >
          <TableCell>{index + (total - i)}</TableCell>
          <TableCell className="capitalize">{item.full_name || "-"}</TableCell>
          <TableCell className="capitalize">{item.gender || "-"}</TableCell>
          <TableCell>{item.email || "-"}</TableCell>
          <TableCell>{item.address || "-"}</TableCell>
          <TableCell>{item.phone || "-"}</TableCell>
          <TableCell>
            {item.created_at
              ? new Date(item.created_at).toLocaleDateString()
              : "-"}
          </TableCell>

          {/* DELETE */}
          <TableCell align="right" onClick={(e) => e.stopPropagation()}>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="btn"
                  disabled={session?.id === item.user_id}
                >
                  <Trash2 className="size-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm delete account?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. All your data and account
                    information will be permanently deleted from our system.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    className="btn capitalize"
                    onClick={() => {
                      if (!item.user_id) return;
                      onDelete(item.user_id);
                      setOpen(!open);
                    }}
                  >
                    delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
