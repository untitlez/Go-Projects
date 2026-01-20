"use client";

import { BadgeCheck, Clock } from "lucide-react";

import { sessionType } from "@/validators/session.validator";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

interface AuthDetailExpireProps {
  session?: sessionType;
  minute: number;
  seconds: number;
}

export const AuthDetailExpire = ({
  session,
  minute,
  seconds,
}: AuthDetailExpireProps) => {
  return (
    <Item className="bg-background">
      <ItemMedia
        variant="icon"
        className={
          session
            ? minute < 10
              ? session && "ItemMedia-error"
              : session && "ItemMedia-success"
            : "ItemMedia-primary"
        }
      >
        <BadgeCheck />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Expire</ItemTitle>
        <ItemDescription>
          {session
            ? new Date(
                session?.registeredClaims?.exp * 1000,
              ).toLocaleTimeString()
            : "N/A"}
        </ItemDescription>
      </ItemContent>

      <ItemActions>
        {session ? (
          <Button
            size="sm"
            variant={minute < 10 ? "destructive" : "default"}
            className="pointer-events-none"
          >
            {minute}:{seconds}
          </Button>
        ) : (
          <Button size="icon" disabled>
            <Clock />
          </Button>
        )}
      </ItemActions>
    </Item>
  );
};
