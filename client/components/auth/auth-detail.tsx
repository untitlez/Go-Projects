"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useStoreAuth } from "@/lib/use-client/store/store-auth";
import { authSignout } from "@/lib/use-client/axios-auth";
import { deleteUser } from "@/lib/use-client/axios-user";
import { userType } from "@/validators/user.validator";
import { sessionType } from "@/validators/session.validator";
import { profileType } from "@/validators/profile.validator";

import { AuthGoogleProvider } from "./auth-google-provider";
import { AuthDetailAccount } from "./auth-detail-account";
import { AuthDetailProfile } from "./auth-detail-profile";
import { AuthDetailExpire } from "./auth-detail-expire";
import { Button } from "@/components/ui/button";
import { Item } from "@/components/ui/item";
import { Card, CardContent } from "@/components/ui/card";

interface AuthDetailProps {
  users?: userType[];
  limit?: userType[];
  session?: sessionType;
  profile?: profileType;
}

export const AuthDetail = ({
  users,
  limit,
  session,
  profile,
}: AuthDetailProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [expire, setExpire] = useState(0);

  const { setAccount } = useStoreAuth();
  const router = useRouter();

  // LOGIC
  const exp = session?.registeredClaims?.exp;
  const now = Math.floor(Date.now() / 1000);

  const minute = Math.floor(expire / 60);
  const seconds = expire % 60;

  const within30Minute = (createdAt: Date) => {
    const created = new Date(createdAt).getTime() || 0;
    const now = Date.now();
    const diff = now - created;
    return diff <= 30 * 60 * 1000;
  };

  const onDelete = async (id: string) => {
    await deleteUser(id);
    if (id === session?.id) await authSignout();
    setOpen(false);
    setIsDelete(false);
    router.refresh();
  };

  const onSignout = async () => {
    setLoading(true);
    await authSignout();
    setLoading(false);
    setShowAccount(false);
    router.refresh();
  };

  useEffect(() => {
    if (!exp) return;
    setExpire(exp - now);
    const timer = setInterval(() => setExpire((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [session]);

  const authDetailAccountProps = {
    data: {
      session,
      users,
      limit,
    },
    state: {
      open,
      setOpen,
      isDelete,
      setIsDelete,
      showAccount,
      setShowAccount,
    },
    func: {
      onDelete,
      setAccount,
      within30Minute,
    },
  };

  return (
    <Card
      className={`w-full h-full bg-muted dark:bg-card ${session && "max-w-2xl"}`}
    >
      <CardContent className="flex flex-1 flex-col justify-center px-4 gap-4 sm:px-6 sm:gap-6">
        {session ? (
          <Item className="bg-background h-[25%] grid place-items-center">
            <Button
              className="btn capitalize"
              disabled={loading}
              onClick={onSignout}
            >
              sign out
            </Button>
          </Item>
        ) : (
          <AuthGoogleProvider />
        )}

        <AuthDetailAccount props={authDetailAccountProps} />

        <div className="grid gap-3">
          <AuthDetailProfile session={session} profile={profile} />
          <AuthDetailExpire
            session={session}
            minute={minute}
            seconds={seconds}
          />
        </div>
      </CardContent>
    </Card>
  );
};
