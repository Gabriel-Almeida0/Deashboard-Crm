import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LayoutDashboard, TrendingUp, UserCheck, HeadphonesIcon, CreditCard, Settings, Menu, X } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { SearchBar } from "@/components/search-bar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { NotificationsPopover } from '@/components/notifications';
import { Toaster } from "@/components/ui/toaster";
import { baseMetadata } from './metadata';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  ...baseMetadata,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen bg-background flex flex-col">
            {/* Navbar */}
            <nav className="border-b">
              <div className="flex h-16 items-center px-4 gap-6 bg-background">
                <Link href="/" className="flex items-center gap-2">
                  <LayoutDashboard className="h-6 w-6" />
                  <span className="font-semibold">Dashboard CRM</span>
                </Link>
                <div className="flex-1 max-w-xl hidden md:block">
                  <SearchBar />
                </div>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <NotificationsPopover />
                  <Link href="/configuracoes">
                    <Settings className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                  </Link>
                  <Avatar className="h-8 w-8" />
                  <MobileNav />
                </div>
              </div>
            </nav>

            <div className="flex flex-1">
              {/* Sidebar - escondido em mobile */}
              <aside className="w-[240px] border-r h-[calc(100vh-64px)] p-4 bg-background hidden md:block">
                <nav className="space-y-2">
                  <Link href="/" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                    <LayoutDashboard className="h-5 w-5" />
                    Visão Geral
                  </Link>
                  <Link href="/vendas" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                    <TrendingUp className="h-5 w-5" />
                    Vendas & Conversões
                  </Link>
                  <Link href="/clientes" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                    <UserCheck className="h-5 w-5" />
                    Comportamento do Cliente
                  </Link>
                  <Link href="/suporte" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                    <HeadphonesIcon className="h-5 w-5" />
                    Suporte & Feedback
                  </Link>
                  <Link href="/financeiro" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                    <CreditCard className="h-5 w-5" />
                    Financeiro & Receita
                  </Link>
                </nav>
              </aside>

              {/* Main Content */}
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}