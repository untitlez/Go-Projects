"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Routes } from "@/lib/routes";
import { sessionType } from "@/validators/session.validator";
import { userType } from "@/validators/user.validator";
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
  allData?: {
    user?: userType;
    profile?: profileType;
  }[];
  session?: sessionType | null;
  onDelete: (value: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const ProfileTableBody = ({
  allData,
  session,
  onDelete,
  open,
  setOpen,
}: ProfileTableBodyProps) => {
  const router = useRouter();

  return (
    <>
      {allData?.map((item, i) => (
        <TableRow
          key={i}
          className="cursor-pointer"
          onClick={() =>
            router.push(Routes.profile.list + item.profile?.user_id)
          }
        >
          <TableCell>{allData.length - i}</TableCell>
          <TableCell>{item.user?.username || "-"}</TableCell>
          <TableCell>{item.profile?.full_name || "-"}</TableCell>
          <TableCell>{item.profile?.gender || "-"}</TableCell>
          <TableCell>
            {item.profile?.birth_date
              ? new Date(item.profile?.birth_date).toLocaleDateString()
              : "-"}
          </TableCell>
          <TableCell>{item.profile?.email || "-"}</TableCell>
          <TableCell>{item.profile?.address || "-"}</TableCell>
          <TableCell>{item.profile?.citizen_id || "-"}</TableCell>
          <TableCell>{item.profile?.phone || "-"}</TableCell>
          <TableCell>
            {item.profile?.created_at
              ? new Date(item.profile.created_at).toLocaleDateString()
              : "-"}
          </TableCell>

          {/* DELETE */}
          <TableCell align="right" onClick={(e) => e.stopPropagation()}>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="btn"
                  disabled={session?.id === item.profile?.user_id}
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
                      if (!item.profile?.user_id) return;
                      onDelete(item.profile?.user_id);
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
