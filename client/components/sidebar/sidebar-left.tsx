"use client";

import { useEffect, useState } from "react";
import { LockKeyhole, NotebookPen, User2 } from "lucide-react";

import { Routes } from "@/lib/routes";
import { fetchProfileById } from "@/lib/use-server/fetch-profile";
import { sessionType } from "@/validators/session.validator";
import { profileType } from "@/validators/profile.validator";

import { SidebarLeftAccount } from "./sidebar-left-account";
import { SidebarLeftMenu } from "./sidebar-left-menu";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

interface SidebarLeftProps {
  session?: sessionType;
}

export const SidebarLeft = ({ session }: SidebarLeftProps) => {
  const [profile, setProfile] = useState<profileType>();

  const getProfile = async () => {
    const data = await fetchProfileById(session?.id);
    setProfile(data);
  };

  useEffect(() => {
    if (session?.id === profile?.user_id) return;
    getProfile();
  }, [session]);

  const menuItems = [
    {
      title: "authentication",
      icon: LockKeyhole,
      isActive: true,
      items: [
        {
          title: "sign up",
          url: Routes.auth.signup,
        },
        {
          title: "sign in",
          url: Routes.auth.signin,
        },
      ],
    },
    {
      title: "account profile",
      icon: User2,
      isActive: true,
      items: [
        {
          title: "all account",
          url: Routes.profile.all,
          require: session ? true : false,
        },
        {
          title: "profile",
          url: Routes.profile.list + session?.id,
          require: session ? true : false,
        },
      ],
    },
    // {
    //   title: "leave system",
    //   icon: NotebookPen,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "link demo",
    //       url: Routes.external.hr_project,
    //     },
    //   ],
    // },
  ];

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <Button
          size="lg"
          className="pointer-events-none font-bold capitalize mt-5.5"
        >
          welcome
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarLeftMenu menuItems={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarLeftAccount session={session} profile={profile} />
      </SidebarFooter>
    </Sidebar>
  );
};
