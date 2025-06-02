"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, TrendingUp, UserCheck, HeadphonesIcon, CreditCard, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="border-b p-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <LayoutDashboard className="h-6 w-6" />
            <span className="font-semibold">Dashboard CRM</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Fechar menu</span>
          </Button>
        </div>
        <div className="p-4">
          <nav className="flex flex-col gap-2">
            <MobileNavLink 
              href="/" 
              icon={<LayoutDashboard className="h-5 w-5" />} 
              label="Visão Geral" 
              isActive={pathname === "/"} 
              onClick={() => setOpen(false)}
            />
            <MobileNavLink 
              href="/vendas" 
              icon={<TrendingUp className="h-5 w-5" />} 
              label="Vendas & Conversões" 
              isActive={pathname === "/vendas"} 
              onClick={() => setOpen(false)}
            />
            <MobileNavLink 
              href="/clientes" 
              icon={<UserCheck className="h-5 w-5" />} 
              label="Comportamento do Cliente" 
              isActive={pathname === "/clientes"} 
              onClick={() => setOpen(false)}
            />
            <MobileNavLink 
              href="/suporte" 
              icon={<HeadphonesIcon className="h-5 w-5" />} 
              label="Suporte & Feedback" 
              isActive={pathname === "/suporte"} 
              onClick={() => setOpen(false)}
            />
            <MobileNavLink 
              href="/financeiro" 
              icon={<CreditCard className="h-5 w-5" />} 
              label="Financeiro & Receita" 
              isActive={pathname === "/financeiro"} 
              onClick={() => setOpen(false)}
            />
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileNavLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function MobileNavLink({ href, icon, label, isActive, onClick }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        isActive 
          ? "bg-accent text-foreground" 
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      }`}
    >
      {icon}
      {label}
    </Link>
  )
} 