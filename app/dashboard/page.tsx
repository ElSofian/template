import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  FileText,
  FolderOpen,
  Package,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Eye,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Dashboard Admin</h1>
              <p className="text-sm text-muted-foreground">Monitoring et reporting global</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Temps réel
            </Badge>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* KPI Overview Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Clients actifs</CardDescription>
              <CardTitle className="text-3xl font-bold">48</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-600">+12%</span> vs mois dernier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Documents partagés</CardDescription>
              <CardTitle className="text-3xl font-bold">1,247</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-600">+89</span> cette semaine
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>RMA en cours</CardDescription>
              <CardTitle className="text-3xl font-bold">7</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />3 en attente de validation
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Valeur RMA (mois)</CardDescription>
              <CardTitle className="text-3xl font-bold">2,450 €</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-600">-18%</span> vs mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid: 2 columns */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Documentation Section */}
          <Card className="lg:row-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>Activité et statistiques</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FolderOpen className="h-4 w-4" />
                    <span className="text-sm">Dossiers</span>
                  </div>
                  <p className="text-2xl font-semibold">156</p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Fichiers</span>
                  </div>
                  <p className="text-2xl font-semibold">1,247</p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">Consultations</span>
                  </div>
                  <p className="text-2xl font-semibold">3,892</p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Téléchargements</span>
                  </div>
                  <p className="text-2xl font-semibold">724</p>
                </div>
              </div>

              <Separator />

              {/* Documents récents */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Documents récents</h4>
                <div className="space-y-2">
                  {[
                    { name: "Guide installation v2.4.pdf", client: "TechCorp", time: "Il y a 2h" },
                    { name: "Spécifications techniques.docx", client: "Nexus Electronics", time: "Il y a 5h" },
                    { name: "Certificat conformité.pdf", client: "SmartFactory", time: "Hier" },
                  ].map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.client}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{doc.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Espace partagé stats */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Espace partagé</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 rounded-md border px-3 py-2">
                    <Upload className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Envoyés</p>
                      <p className="text-xs text-muted-foreground">342 fichiers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border px-3 py-2">
                    <Download className="h-4 w-4 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium">Reçus</p>
                      <p className="text-xs text-muted-foreground">187 fichiers</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RMA Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Retours (RMA)</CardTitle>
                  <CardDescription>Suivi des demandes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status breakdown */}
              <div className="space-y-3">
                {[
                  { label: "En attente", count: 3, color: "bg-amber-500", percent: 25 },
                  { label: "En transit", count: 2, color: "bg-blue-500", percent: 17 },
                  { label: "Reçus", count: 1, color: "bg-violet-500", percent: 8 },
                  { label: "Traités", count: 4, color: "bg-emerald-500", percent: 33 },
                  { label: "Remboursés", count: 2, color: "bg-teal-500", percent: 17 },
                ].map((status) => (
                  <div key={status.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span>{status.label}</span>
                      <span className="font-medium">{status.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full ${status.color} rounded-full`} style={{ width: `${status.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* RMA récents */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">RMA récents</h4>
                {[
                  {
                    id: "RMA-2024-001",
                    product: "Module capteur IoT",
                    status: "En attente",
                    statusColor: "text-amber-600 bg-amber-50",
                  },
                  {
                    id: "RMA-2024-002",
                    product: "Carte contrôleur V2",
                    status: "En transit",
                    statusColor: "text-blue-600 bg-blue-50",
                  },
                ].map((rma) => (
                  <div key={rma.id} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                    <div>
                      <p className="font-medium">{rma.id}</p>
                      <p className="text-xs text-muted-foreground">{rma.product}</p>
                    </div>
                    <Badge variant="outline" className={rma.statusColor}>
                      {rma.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activité récente */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>Dernières actions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: Upload,
                    text: "Document uploadé par TechCorp",
                    time: "Il y a 15 min",
                    color: "text-blue-600",
                  },
                  {
                    icon: Package,
                    text: "Nouveau RMA créé - RMA-2024-006",
                    time: "Il y a 1h",
                    color: "text-amber-600",
                  },
                  { icon: CheckCircle2, text: "RMA-2024-004 remboursé", time: "Il y a 3h", color: "text-emerald-600" },
                  { icon: Download, text: "Guide téléchargé par Nexus", time: "Il y a 5h", color: "text-violet-600" },
                  { icon: Users, text: "Nouveau client: Interface Plus", time: "Hier", color: "text-primary" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertes / Attention requise */}
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <CardTitle>Attention requise</CardTitle>
                <CardDescription>Éléments nécessitant une action</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="flex items-center gap-3 rounded-md border border-amber-200 dark:border-amber-800 bg-background px-4 py-3">
                <Clock className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium">3 RMA en attente</p>
                  <p className="text-xs text-muted-foreground">Validation requise depuis +48h</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-amber-200 dark:border-amber-800 bg-background px-4 py-3">
                <FileText className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium">Documentation obsolète</p>
                  <p className="text-xs text-muted-foreground">5 fichiers non mis à jour depuis 6 mois</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-amber-200 dark:border-amber-800 bg-background px-4 py-3">
                <Users className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium">2 clients inactifs</p>
                  <p className="text-xs text-muted-foreground">Aucune activité depuis 30 jours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
