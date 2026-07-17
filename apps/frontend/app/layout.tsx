import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/common/lib/utils";
import { Toaster } from "@/common/components/ui/sonner";
import QueryProvider from "@/common/providers/query-provider";
import ThemeProvider from "@/common/providers/theme-provider";
import AuthGuardProvider from "@/common/providers/auth-guard-provider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Super Batch",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("antialiased", "font-sans", inter.variable)}>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <main className="min-h-screen">
              <AuthGuardProvider>
                {children}
              </AuthGuardProvider>
            </main>
            <Toaster richColors position="top-center" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
