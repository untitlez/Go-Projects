"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";

import { authSignout } from "@/lib/use-client/axios-auth";
import { sessionType } from "@/validators/session.validator";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProfileSignoutProps {
  data: {
    session?: sessionType;
  };
}

export const ProfileSignout = ({ data }: ProfileSignoutProps) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { session } = data;

  const onSignout = async () => {
    if (!session) return;
    setLoading(true);
    await authSignout(session);
    setLoading(false);
    router.refresh();
  };

  return (
    <Card className="h-full bg-muted dark:bg-card grid place-items-center px-4 sm:px-6">
      <Button
        variant="secondary"
        className="bg-background border btn capitalize"
        disabled={loading}
        onClick={onSignout}
      >
        <LogOut />
        sign out
      </Button>
    </Card>
  );
};
