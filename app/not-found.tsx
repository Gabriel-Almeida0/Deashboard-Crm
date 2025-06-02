import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="p-6 flex items-center justify-center min-h-[calc(100vh-100px)]">
      <Card className="w-full max-w-md p-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="p-3 bg-primary/10 rounded-full">
            <FileQuestion className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Página não encontrada</h2>
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
          <div className="flex space-x-2">
            <Button asChild>
              <Link href="/">
                Voltar para o início
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 