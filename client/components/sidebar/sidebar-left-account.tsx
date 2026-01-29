"use client";

import Link from "next/link";

import { Routes } from "@/lib/routes";
import { sessionType } from "@/validators/session.validator";
import { profileType } from "@/validators/profile.validator";

import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarLeftAccountProps {
  data?: {
    session?: sessionType;
    profile?: profileType;
  };
}

export const SidebarLeftAccount = ({ data }: SidebarLeftAccountProps) => {
  const profilePath = Routes.profile.list + data?.session?.id;

  return (
    <SidebarMenu>
      {data?.session ? (
        <SidebarMenuButton
          asChild
          size="lg"
          className="bg-muted border cursor-pointer active:opacity-75"
        >
          <Link href={profilePath}>
            <Avatar className="rounded-md">
              <AvatarImage
                src={data.profile?.image || data?.session?.image}
                alt="Profile Image"
                className="h-full w-full"
              />
              <AvatarFallback className="bg-sidebar border rounded-md" />
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight capitalize text">
              <span className="truncate font-medium">
                {data
                  ? data?.session?.username || data?.profile?.full_name
                  : "username"}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {data ? data?.session?.email || data?.profile?.email : "email"}
              </span>
            </div>
          </Link>
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
