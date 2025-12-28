"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

import { Routes } from "@/lib/routes";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const UnauthorizedPage = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Lock className="size-5" />
        </EmptyMedia>
        <EmptyTitle className="capitalize">sign in required</EmptyTitle>
        <EmptyDescription>
          You need to be logged in to see your notifications.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild variant="outline" className="btn capitalize">
          <Link href={Routes.auth.signin}>sign in</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};
