"use client";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "../theme/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface SidebarHeaderProps {
  id?: string;
}

export const SidebarHeader = ({ id }: SidebarHeaderProps) => {
  const pathName = usePathname().split("/").slice(1);

  return (
    <header className="bg-background sticky top-0 h-14 shrink-0 flex items-center gap-2 z-50">
      {/* Left */}
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {pathName.map((path, i) => (
              <div key={i} className="flex items-center gap-1.5 break-words">
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 capitalize">
                    {path == id ? "personal" : path}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                {i == pathName.length - 1 ? "" : <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
};
