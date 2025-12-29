import { CookieBanner } from "@/components/cookie-banner";
import { AppSideBar } from "@/components/sidebar/app-sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppSideBar>
      {children}
      <CookieBanner />
    </AppSideBar>
  );
}
