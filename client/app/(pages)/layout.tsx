import { fetchSession } from "@/lib/use-server/fetch-session";

import { CookieBanner } from "@/components/cookie-banner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarHeader } from "@/components/sidebar/sidebar-header";
import { SidebarLeft } from "@/components/sidebar/sidebar-left";
import { SidebarRight } from "@/components/sidebar/sidebar-right";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await fetchSession();

  return (
    <SidebarProvider>
      <SidebarLeft session={session} />
      <SidebarInset className="overflow-x-hidden gap-6 p-2 sm:p-8 pt-6">
        <SidebarHeader id={session?.id} />
        {children}
      </SidebarInset>
      <SidebarRight />
      <CookieBanner />
    </SidebarProvider>
  );
}
