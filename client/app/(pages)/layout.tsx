import { fetchSession } from "@/lib/use-server/fetch-session";

import { CookieBanner } from "@/components/cookie-banner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarHeader } from "@/components/sidebar/sidebar-header";
import { SidebarLeft } from "@/components/sidebar/sidebar-left";
// import { SidebarRight } from "@/components/sidebar/sidebar-right";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await fetchSession();
  
  return (
    <SidebarProvider>
      <SidebarLeft session={session} />
      <SidebarInset className="my-2 mx-4 overflow-x-hidden">
        <SidebarHeader id={session?.id} />
        <div className="flex flex-1 flex-col gap-4">
          <div className="w-full rounded-xl px-8 py-16 justify-items-center">
            {children}
          </div>
        </div>
      </SidebarInset>
      {/* <SidebarRight className="py-4 mr-2"/> */}
      <CookieBanner />
    </SidebarProvider>
  );
}
