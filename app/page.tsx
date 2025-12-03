import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Package } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Portail Client</h1>
          <p className="text-muted-foreground">Accédez à votre documentation produit ou gérez vos retours.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/documentation">
            <Card className="h-full transition-colors hover:border-primary hover:bg-muted/50 cursor-pointer">
              <CardHeader className="space-y-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>
                    Consultez la documentation produit et accédez à l'espace partagé avec votre vendeur.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/rma">
            <Card className="h-full transition-colors hover:border-primary hover:bg-muted/50 cursor-pointer">
              <CardHeader className="space-y-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Retours (RMA)</CardTitle>
                  <CardDescription>
                    Suivez vos demandes de retour et créez de nouvelles demandes d'autorisation.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
