import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Go Projects",
  description: "",
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" className="capitalize" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
