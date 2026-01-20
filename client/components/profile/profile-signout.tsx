"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authSignout } from "@/lib/use-client/axios-auth";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut } from "lucide-react";

export const ProfileSignout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSignout = async () => {
    setLoading(true);
    await authSignout();
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
