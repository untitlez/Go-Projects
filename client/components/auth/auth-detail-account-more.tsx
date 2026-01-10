"use client";

import { List, Plus, Trash2 } from "lucide-react";

import { userType } from "@/validators/user.validator";
import { sessionType } from "@/validators/session.validator";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AuthDetailAccountMoreProps {
  session?: sessionType;
  users?: userType[] | null;
  showDelete: boolean;
  setShowDelete: (value: boolean) => void;
  onDelete: (value: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  setAccount: (value: { username?: string; password?: string }) => void;
  within30Min: (value: Date) => boolean;
}

export const AuthDetailAccountMore = ({
  session,
  users,
  showDelete,
  setShowDelete,
  open,
  setOpen,
  onDelete,
  setAccount,
  within30Min,
}: AuthDetailAccountMoreProps) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer capitalize bg-secondary"
        >
          <List />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="left"
        align="start"
        className="grid grid-cols-2 gap-2"
      >
        {/* All Accounts */}
        {users?.map((account, i) =>
          showDelete ? (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="btn">
                  <Trash2 />
                  {account.username}
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
                    onClick={() => onDelete(account?.id)}
                  >
                    delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              variant="secondary"
              className="btn hover:text-primary"
              key={i}
              onClick={() =>
                setAccount({
                  username: account?.username,
                  password: account?.password,
                })
              }
            >
              <Plus />
              <span className="truncate">{account?.username}</span>
              {within30Min(account?.created_at ?? new Date(0)) && i === 0 ? (
                <div className="bg-blue-500 dark:bg-blue-600 rounded-full size-2" />
              ) : (
                ""
              )}
            </Button>
          )
        )}
        {/* On Delete */}
        {session && (
          <Button
            variant={showDelete ? "outline" : "destructive"}
            className="col-span-2 cursor-pointer capitalize hover:opacity-80 mt-3"
            onClick={() => setShowDelete(!showDelete)}
          >
            {showDelete ? (
              "cancel"
            ) : (
              <>
                <Trash2 />
                delete
              </>
            )}
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};
