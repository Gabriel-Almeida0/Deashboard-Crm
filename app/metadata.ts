import { Metadata } from "next"

export const baseMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Dashboard CRM",
    template: "%s | Dashboard CRM",
  },
  description: "Sistema completo de gestão de relacionamento com o cliente",
  keywords: [
    "crm",
    "dashboard",
    "gestão de clientes",
    "vendas",
    "suporte",
    "financeiro",
    "analytics",
  ],
  authors: [{ name: "Dashboard CRM Team" }],
  creator: "Dashboard CRM",
  publisher: "Dashboard CRM",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Dashboard CRM",
    description: "Sistema completo de gestão de relacionamento com o cliente",
    siteName: "Dashboard CRM",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard CRM",
    description: "Sistema completo de gestão de relacionamento com o cliente",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
} 