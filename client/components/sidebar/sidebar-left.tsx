"use client";

import { LockKeyhole, NotebookPen, User2 } from "lucide-react";

import { Routes } from "@/lib/routes";
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
  data?: {
    session?: sessionType;
    profile?: profileType;
  };
}

export const SidebarLeft = ({ data }: SidebarLeftProps) => {
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
          require: data?.session ? true : false,
        },
        {
          title: "profile",
          url: Routes.profile.list + data?.session?.id,
          require: data?.session ? true : false,
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
        <SidebarLeftAccount data={data} />
      </SidebarFooter>
    </Sidebar>
  );
};
