"use client";

import { useEffect } from "react";

import { useStoreAuth } from "@/lib/use-client/store/store-auth";
import { useSession } from "@/lib/use-client/hook/use-auth";

import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const SidebarAccount = () => {
  const { authorization } = useStoreAuth();
  const { session, getSession } = useSession();

  useEffect(() => {
    if (session) return;
    getSession();
  }, [authorization]);

  return (
    <SidebarMenu className="pointer-events-none">
      {authorization ? (
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
