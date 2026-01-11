"use client";

import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { sessionType } from "@/validators/session.validator";

interface SidebarAccountProps {
  session?: sessionType;
}

export const SidebarAccount = ({ session }: SidebarAccountProps) => {
  return (
    <SidebarMenu className="pointer-events-none">
      {session ? (
        <SidebarMenuButton
          size="lg"
          className="border bg-muted dark:bg-background"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={session?.image || "/shiba.jpg"}
              alt="Profile Image"
            />
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{session?.username}</span>
            <span className="truncate text-xs text-muted-foreground">
              {session?.email || session?.role}
            </span>
          </div>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton
          variant="outline"
          className="border bg-muted dark:bg-background"
        >
          <span className="flex flex-1 justify-center text-xs text-muted-foreground truncate">
            © {new Date().getFullYear()} - SUPANAT CHAISRI
          </span>
        </SidebarMenuButton>
      )}
    </SidebarMenu>
  );
};
