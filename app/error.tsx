"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Pode adicionar logs para serviços como Sentry ou outros
    console.error(error)
  }, [error])

  return (
    <div className="p-6 flex items-center justify-center min-h-[calc(100vh-100px)]">
      <Card className="w-full max-w-md p-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="p-3 bg-red-100 rounded-full dark:bg-red-900">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-semibold">Algo deu errado</h2>
          <p className="text-muted-foreground">
            Ocorreu um erro ao carregar esta página. Tente novamente ou entre em contato com o suporte.
          </p>
          <div className="flex space-x-2">
            <Button onClick={reset} variant="outline">
              Tentar novamente
            </Button>
            <Button onClick={() => window.location.href = "/"}>
              Voltar para o início
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 