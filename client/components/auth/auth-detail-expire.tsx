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
  min: number;
  sec: number;
}

export const AuthDetailExpire = ({
  session,
  min,
  sec,
}: AuthDetailExpireProps) => {
  return (
    <Item variant="outline">
      <ItemMedia
        variant="icon"
        className={
          min < 10
            ? `${session ? "ItemMedia-error" : ""}`
            : `${session ? "ItemMedia-success" : ""}`
        }
      >
        <BadgeCheck />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Expire</ItemTitle>
        <ItemDescription>
          {session
            ? new Date(
                session?.registeredClaims?.exp * 1000
              ).toLocaleTimeString()
            : "N/A"}
        </ItemDescription>
      </ItemContent>

      <ItemActions>
        {session ? (
          <Button
            variant={min < 10 ? "destructive" : "default"}
            className="pointer-events-none"
          >
            {min}:{sec}
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
