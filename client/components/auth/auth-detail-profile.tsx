"use client";

import { BadgeCheck, User2 } from "lucide-react";

import { sessionType } from "@/validators/session.validator";
import { profileType } from "@/validators/profile.validator";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AuthDetailProfileProps {
  session?: sessionType;
  profile?: profileType;
}

export const AuthDetailProfile = ({
  session,
  profile,
}: AuthDetailProfileProps) => {
  const items = [
    { label: "username", defaultValue: session?.username },
    { label: "email", defaultValue: session?.email || profile?.email },
    { label: "role", defaultValue: session?.role },
  ];

  return (
    <Item className="bg-background">
      <ItemMedia
        variant="icon"
        className={session ? "ItemMedia-success" : "ItemMedia-primary"}
      >
        <BadgeCheck />
      </ItemMedia>

      <ItemContent>
        <ItemTitle>
          {session?.username || session?.email || "Username"}
        </ItemTitle>
        <ItemDescription>{session?.role || "Role"}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Popover>
          <PopoverTrigger asChild>
            {session ? (
              <Button size="sm" className="cursor-pointer capitalize">
                view
              </Button>
            ) : (
              <Button size="icon" disabled>
                <User2 />
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent side="bottom">
            <div className="grid gap-2">
              {items.map((item, i) => (
                <div key={i} className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-sm text-muted-foreground capitalize">
                    {item.label}
                  </Label>
                  <Input
                    readOnly
                    tabIndex={-1}
                    defaultValue={item.defaultValue || "-"}
                    className="col-span-2"
                  />
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </ItemActions>
    </Item>
  );
};
