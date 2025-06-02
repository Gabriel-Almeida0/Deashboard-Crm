"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

const routes: Record<string, string> = {
  "": "Início",
  "vendas": "Vendas & Conversões",
  "clientes": "Comportamento do Cliente",
  "suporte": "Suporte & Feedback",
  "financeiro": "Financeiro & Receita",
  "configuracoes": "Configurações"
}

export function Breadcrumb() {
  const pathname = usePathname()
  const paths = pathname.split("/").filter(Boolean)
  
  if (paths.length === 0) return null
  
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center text-sm text-muted-foreground">
        <li className="flex items-center">
          <Link href="/" className="flex items-center hover:text-foreground transition-colors">
            <Home className="h-4 w-4 mr-1" />
            <span className="sr-only sm:not-sr-only">Início</span>
          </Link>
        </li>
        {paths.map((path, i) => {
          const href = `/${paths.slice(0, i + 1).join("/")}`
          const isLast = i === paths.length - 1
          
          return (
            <li key={path} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {routes[path] || path}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-foreground transition-colors"
                >
                  {routes[path] || path}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
} 