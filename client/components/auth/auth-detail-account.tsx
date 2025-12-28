"use client";

import { Plus } from "lucide-react";

import { userType } from "@/validators/user.validator";

import { AuthDetailAccountMore } from "./auth-detail-account-more";
import { Button } from "@/components/ui/button";

interface AuthDetailAccountProps {
  authorization?: boolean;
  users?: userType[] | null;
  limit?: userType[] | null;
  showDelete: boolean;
  setShowDelete: (value: boolean) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  onDelete: (value: string) => void;
  setAccount: (value: { username?: string; password?: string }) => void;
  within30Min: (value: Date) => boolean;
}

export const AuthDetailAccount = ({
  authorization,
  users,
  limit,
  showDelete,
  setShowDelete,
  onDelete,
  open,
  setOpen,
  setAccount,
  within30Min,
}: AuthDetailAccountProps) => {
  return (
    <div className="grid gap-2">
      <p className="capitalize font-medium text-sm text-muted-foreground">
        sign in with guest
      </p>

      <div className="flex items-center justify-between">
        {/* Lated Accounts */}
        <div className="flex flex-wrap gap-4">
          {limit?.map((account, i) => (
            <Button
              variant="secondary"
              className="btn"
              key={i}
              onClick={() =>
                setAccount({
                  username: account?.username,
                  password: account?.password,
                })
              }
            >
              <Plus />
              {account.username}

              {/* Lated */}
              {within30Min(account?.created_at ?? new Date(0)) && i === 0 ? (
                <div className="bg-blue-500 dark:bg-blue-600 rounded-full size-2" />
              ) : (
                ""
              )}
            </Button>
          ))}
        </div>

        {/* More Account*/}
        {users && (
          <AuthDetailAccountMore
            authorization={authorization}
            users={users}
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            open={open}
            setOpen={setOpen}
            onDelete={onDelete}
            setAccount={setAccount}
            within30Min={within30Min}
          />
        )}
      </div>
    </div>
  );
};
