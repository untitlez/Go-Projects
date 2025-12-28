"use client";

import Link from "next/link";
import { ChevronRight, Lock } from "lucide-react";

import { SidebarLeftProps } from "./sidebar-left";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export const SidebarLeftMenu = ({ menuItems }: SidebarLeftProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Go Projects</SidebarGroupLabel>
      <SidebarMenu>
        {menuItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span className="capitalize">{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem
                      className="capitalize"
                      key={subItem.title}
                    >
                      <SidebarMenuSubButton
                        asChild
                        className="text-muted-foreground active:text-foreground/75"
                        aria-disabled={subItem.require === false}
                      >
                        <Link href={subItem.url}>
                          {/* Condition 1 */}
                          <span>{subItem.title}</span>

                          {/* Condition 2 */}
                          {subItem.title === "all account" && (
                            <span className="ml-auto">
                              {subItem.require ? subItem.count : ""}
                            </span>
                          )}

                          {/* Condition 3 */}
                          {subItem.require === false && (
                            <span className="ml-auto">
                              <Lock className="size-3" />
                            </span>
                          )}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
