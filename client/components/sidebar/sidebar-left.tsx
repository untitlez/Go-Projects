"use client";

import { LucideIcon } from "lucide-react";

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

export interface SidebarLeftProps {
  menuItems: {
    title: string;
    icon: LucideIcon;
    isActive: boolean;
    items: {
      title: string;
      url: string;
      count?: number;
      require?: boolean;
    }[];
  }[];
}

export const SidebarLeft = ({ menuItems }: SidebarLeftProps) => {
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
        <SidebarAccount />
      </SidebarFooter>
    </Sidebar>
  );
};
