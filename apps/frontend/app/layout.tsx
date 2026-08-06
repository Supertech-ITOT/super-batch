import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/common/lib/utils";
import { Toaster } from "@/common/components/ui/sonner";
import QueryProvider from "@/common/providers/query-provider";
import ThemeProvider from "@/common/providers/theme-provider";
import AuthGuardProvider from "@/common/providers/auth-guard-provider";
import TitleBar from "@/common/components/title-bar";
import { SidebarProvider } from "@/common/components/navigation/sidebar-provider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Super Batch",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("antialiased", "font-sans", inter.variable)}>
      <body className="h-dvh overflow-hidden">
        <ThemeProvider>
          <QueryProvider>
            <AuthGuardProvider>
              <SidebarProvider>
                <div className="flex h-full flex-col">
                  <TitleBar />
                  <main className="min-h-0 flex-1 overflow-y-auto">
                    {children}
                  </main>
                </div>
              </SidebarProvider>
            </AuthGuardProvider>
            <Toaster richColors position="bottom-right" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
