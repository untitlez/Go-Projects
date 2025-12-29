"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useStoreAuth } from "@/lib/use-client/store/store-auth";
import { authSignout } from "@/lib/use-client/axios-auth";
import { deleteUser } from "@/lib/use-client/axios-user";
import { userType } from "@/validators/user.validator";
import { sessionType } from "@/validators/session.validator";

import { AuthDetailAccount } from "./auth-detail-account";
import { AuthDetailProfile } from "./auth-detail-profile";
import { AuthDetailExpire } from "./auth-detail-expire";
import { Card, CardContent } from "@/components/ui/card";

interface AuthDetailProps {
  users?: userType[];
  limit?: userType[];
  session?: sessionType;
}

export const AuthDetail = ({ users, limit, session }: AuthDetailProps) => {
  const [showDelete, setShowDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [expire, setExpire] = useState(0);

  const { setAccount } = useStoreAuth();
  const router = useRouter();

  // LOGIC
  const exp = session?.registeredClaims?.exp;
  const now = Math.floor(Date.now() / 1000);

  const min = Math.floor(expire / 60);
  const sec = expire % 60;

  const within30Min = (createdAt: Date) => {
    const created = new Date(createdAt).getTime();
    const now = Date.now();
    const diff = now - created;
    return diff <= 30 * 60 * 1000;
  };

  const onDelete = async (id: string) => {
    await deleteUser(id);
    if (id === session?.id) await authSignout();
    router.refresh();
    setShowDelete(false);
    setOpen(false);
  };

  useEffect(() => {
    if (!exp) return;
    setExpire(exp - now);
    const timer = setInterval(() => setExpire((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [session]);

  return (
    <Card className="overflow-hidden h-full w-full p-0 bg-transparent">
      <CardContent className="h-full p-6 md:p-8 space-y-4">
        <AuthDetailAccount
          session={session}
          users={users}
          limit={limit}
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          open={open}
          setOpen={setOpen}
          onDelete={onDelete}
          setAccount={setAccount}
          within30Min={within30Min}
        />
        <AuthDetailProfile session={session} />
        <AuthDetailExpire session={session} min={min} sec={sec} />
      </CardContent>
    </Card>
  );
};
