"use client";

import { LockKeyhole, NotebookPen, User2 } from "lucide-react";

import { Routes } from "@/lib/routes";
import { sessionType } from "@/validators/session.validator";

import { SidebarAccount } from "./sidebar-account";
import { SidebarLeftMenu } from "./sidebar-left-menu";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";

interface SidebarLeftProps {
  session?: sessionType;
}

export const SidebarLeft = ({ session }: SidebarLeftProps) => {
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
    <Sidebar collapsible="offcanvas" variant="floating" className="py-4 ml-2">
      <SidebarHeader>
        <SidebarMenu>
          <Button className="pointer-events-none font-bold capitalize">
            welcome
          </Button>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarLeftMenu menuItems={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarAccount session={session}/>
      </SidebarFooter>
    </Sidebar>
  );
};
