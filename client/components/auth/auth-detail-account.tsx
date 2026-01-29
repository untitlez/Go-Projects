"use client";

import { useState } from "react";
import { KeyRound, List, Trash2, X } from "lucide-react";

import { userType } from "@/validators/user.validator";
import { sessionType } from "@/validators/session.validator";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Item, ItemContent, ItemHeader } from "@/components/ui/item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthDetailAccountProps {
  props: {
    data: {
      session?: sessionType;
      users?: userType[];
    };
    state: {
      open: boolean;
      setOpen: (value: boolean) => void;
      isDelete: boolean;
      setIsDelete: (value: boolean) => void;
      showAccount: boolean;
      setShowAccount: (value: boolean) => void;
    };
    func: {
      onDelete: (value: string) => void;
      setAccount: (value: { username?: string; password?: string }) => void;
      within30Minute: (value: Date) => boolean;
    };
  };
}

export const AuthDetailAccount = ({ props }: AuthDetailAccountProps) => {
  const [select, setSelect] = useState("");

  const { session, users } = props.data;
  const { open, setOpen, isDelete, setIsDelete, showAccount, setShowAccount } =
    props.state;
  const { onDelete, setAccount, within30Minute } = props.func;

  const onClickDelete = (account: userType) => {
    if (isDelete) {
      setSelect(account.id);
      setOpen(true);
      return;
    }

    setOpen(false);
    setAccount({
      username: account?.username,
      password: account?.password,
    });
    return;
  };

  const showBadge = (account?: userType, i?: number) => {
    if (!account?.created_at) return;
    return within30Minute(account?.created_at) && i === 0;
  };

  return (
    <Item className="bg-background">
      <ItemHeader className="capitalize font-medium text-sm text-muted-foreground dark:text-primary">
        <p>sign in with guest</p>
        <Tooltip>
          <TooltipTrigger asChild>
            {session ? (
              <Button
                size="icon-sm"
                variant={isDelete ? "secondary" : "destructive"}
                className="btn"
                onClick={() => {
                  if (!session) return;
                  setIsDelete(!isDelete);
                }}
              >
                {isDelete ? <X /> : <Trash2 />}
              </Button>
            ) : (
              <Button
                size="icon-sm"
                variant="secondary"
                className="btn"
                hidden={showAccount}
                onClick={() => setShowAccount(true)}
              >
                <List />
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent className="capitalize">
            {session ? (isDelete ? "close" : "delete") : "more accounts"}
          </TooltipContent>
        </Tooltip>
      </ItemHeader>

      <ItemContent>
        <ScrollArea className={showAccount || session ? "h-[25vh]" : ""}>
          <div className="grid gap-3">
            <Dialog open={open} onOpenChange={setOpen}>
              {users?.map((account, i) => (
                <Button
                  key={i}
                  className="relative w-full btn"
                  variant={isDelete ? "destructive" : "outline"}
                  disabled={!isDelete && session !== null}
                  onClick={() => onClickDelete(account)}
                >
                  {isDelete ? <Trash2 /> : <KeyRound />}
                  <span className="m-auto truncate">{account.username}</span>

                  <Badge
                    hidden={!showBadge(account, i)}
                    variant="secondary"
                    className="bg-blue-500 dark:bg-blue-600 h-5 min-w-5 scale-50 sm:scale-100 absolute right-1 sm:rounded-sm"
                  >
                    <span className="hidden sm:block">New</span>
                  </Badge>
                </Button>
              ))}

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
                    type="button"
                    variant="destructive"
                    className="btn capitalize"
                    onClick={() => onDelete(select)}
                  >
                    delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </ScrollArea>
      </ItemContent>
    </Item>
  );
};
