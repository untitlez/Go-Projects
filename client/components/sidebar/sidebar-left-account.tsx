"use client";

import { sessionType } from "@/validators/session.validator";
import { profileType } from "@/validators/profile.validator";

import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarLeftAccountProps {
  session?: sessionType;
  profile?: profileType;
}

export const SidebarLeftAccount = ({
  session,
  profile,
}: SidebarLeftAccountProps) => {
  return (
    <SidebarMenu className="pointer-events-none">
      {session ? (
        <SidebarMenuButton size="lg" className="bg-muted border">
          <Avatar className="rounded-md">
            <AvatarImage
              src={profile?.image || session?.image}
              alt="Profile Image"
              className="h-full w-full"
            />
            <AvatarFallback className="bg-sidebar border rounded-md" />
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight capitalize text">
            <span className="truncate font-medium">{session?.username}</span>
            <span className="truncate text-xs text-muted-foreground">
              {session?.email || session?.role}
            </span>
          </div>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton className="bg-muted border">
          <span className="flex flex-1 justify-center text-xs text-muted-foreground truncate">
            © {new Date().getFullYear()} - SUPANAT CHAISRI
          </span>
        </SidebarMenuButton>
      )}
    </SidebarMenu>
  );
};
