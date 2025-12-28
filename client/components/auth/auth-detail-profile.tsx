"use client";

import Image from "next/image";
import { BadgeCheck, User2 } from "lucide-react";

import { sessionType } from "@/validators/session.validator";

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
  authorization?: boolean;
  session?: sessionType | null;
}

export function AuthDetailProfile({
  authorization,
  session,
}: AuthDetailProfileProps) {
  const items = [
    { label: "username", defaultValue: session?.username },
    { label: "email", defaultValue: session?.email },
    { label: "role", defaultValue: session?.role },
  ];

  return (
    <Item variant="outline">
      {authorization ? (
        <ItemMedia variant="image">
          <Image
            src={session?.image || "/shiba.jpg"}
            alt="profile image"
            className="bg-muted object-cover"
            sizes="20vw"
            fill
          />
        </ItemMedia>
      ) : (
        <ItemMedia variant="icon">
          <BadgeCheck />
        </ItemMedia>
      )}

      <ItemContent>
        <ItemTitle>{session?.username ?? "Username"}</ItemTitle>
        <ItemDescription>{session?.role ?? "Role"}</ItemDescription>
      </ItemContent>
      <ItemActions>
        {authorization ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="cursor-pointer capitalize">view</Button>
            </PopoverTrigger>
            <PopoverContent side="left">
              <div className="grid gap-2">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-3 items-center gap-4 capitalize"
                  >
                    <Label className="text-sm text-muted-foreground">
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
        ) : (
          <Button size="icon" disabled>
            <User2 />
          </Button>
        )}
      </ItemActions>
    </Item>
  );
}
