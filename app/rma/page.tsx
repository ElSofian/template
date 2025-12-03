"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  CheckCircle2,
  Clock,
  Package,
  PackageX,
  Plus,
  RefreshCw,
  Truck,
  XCircle,
  ChevronRight,
  Calendar,
  Euro,
  Hash,
} from "lucide-react"

type RMAStatus = "pending" | "approved" | "in_transit" | "received" | "processed" | "refunded" | "rejected"

interface RMARequest {
  id: string
  orderRef: string
  product: string
  quantity: number
  reason: string
  status: RMAStatus
  createdAt: string
  customer: string
  value: number
}

const initialRMAs: RMARequest[] = [
  {
    id: "RMA-2024-001",
    orderRef: "CMD-78542",
    product: "Module capteur IoT Pro",
    quantity: 3,
    reason: "Défaut de fabrication",
    status: "pending",
    createdAt: "2024-03-08",
    customer: "TechCorp Industries",
    value: 450,
  },
  {
    id: "RMA-2024-002",
    orderRef: "CMD-78123",
    product: "Carte contrôleur V2",
    quantity: 1,
    reason: "Produit non conforme",
    status: "in_transit",
    createdAt: "2024-03-06",
    customer: "Nexus Electronics",
    value: 280,
  },
  {
    id: "RMA-2024-003",
    orderRef: "CMD-77985",
    product: "Alimentation 24V",
    quantity: 5,
    reason: "Erreur de commande",
    status: "received",
    createdAt: "2024-03-04",
    customer: "SmartFactory SAS",
    value: 175,
  },
  {
    id: "RMA-2024-004",
    orderRef: "CMD-77654",
    product: "Écran tactile 10 pouces",
    quantity: 1,
    reason: "Dysfonctionnement",
    status: "refunded",
    createdAt: "2024-02-28",
    customer: "Interface Plus",
    value: 320,
  },
  {
    id: "RMA-2024-005",
    orderRef: "CMD-76890",
    product: "Connecteur étanche IP67",
    quantity: 20,
    reason: "Non compatible",
    status: "rejected",
    createdAt: "2024-02-22",
    customer: "AquaSystems",
    value: 80,
  },
]

// Workflow steps for normal flow (not rejected)
const workflowSteps = [
  { key: "pending", label: "En attente", icon: Clock },
  { key: "approved", label: "Approuvé", icon: CheckCircle2 },
  { key: "in_transit", label: "En transit", icon: Truck },
  { key: "received", label: "Reçu", icon: Package },
  { key: "processed", label: "Traité", icon: RefreshCw },
  { key: "refunded", label: "Remboursé", icon: CheckCircle2 },
]

function getStepIndex(status: RMAStatus): number {
  if (status === "rejected") return -1
  return workflowSteps.findIndex((s) => s.key === status)
}

function StatusTracker({ status }: { status: RMAStatus }) {
  const isRejected = status === "rejected"
  const currentIndex = getStepIndex(status)

  if (isRejected) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-950/30 px-4 py-3 border border-red-200 dark:border-red-900">
        <XCircle className="h-5 w-5 text-red-500" />
        <span className="text-sm font-medium text-red-700 dark:text-red-300">Demande refusée</span>
      </div>
    )
  }

  return (
    <div className="w-full py-4">
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-muted" />
        {/* Progress line */}
        <div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-500"
          style={{
            width: `${(currentIndex / (workflowSteps.length - 1)) * 100}%`,
          }}
        />

        {workflowSteps.map((step, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          const isPending = index > currentIndex
          const Icon = step.icon

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center">
              {/* Circle */}
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300
                  ${
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                        ? "border-primary bg-background text-primary ring-4 ring-primary/20"
                        : "border-muted bg-background text-muted-foreground"
                  }
                `}
              >
                {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
              </div>
              {/* Label */}
              <span
                className={`
                  mt-2 text-xs font-medium whitespace-nowrap
                  ${isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"}
                `}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RMACard({
  rma,
  onUpdateStatus,
}: {
  rma: RMARequest
  onUpdateStatus: (id: string, status: RMAStatus) => void
}) {
  const nextStatusMap: Partial<Record<RMAStatus, RMAStatus>> = {
    pending: "approved",
    approved: "in_transit",
    in_transit: "received",
    received: "processed",
    processed: "refunded",
  }

  const nextStatus = nextStatusMap[rma.status]
  const canProgress = nextStatus !== undefined
  const canReject = rma.status === "pending"

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg">{rma.product}</CardTitle>
            <CardDescription>{rma.customer}</CardDescription>
          </div>
          <Badge variant="outline" className="shrink-0">
            {rma.id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Info row */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Hash className="h-3.5 w-3.5" />
            <span>{rma.orderRef}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Package className="h-3.5 w-3.5" />
            <span>Qté: {rma.quantity}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Euro className="h-3.5 w-3.5" />
            <span>{rma.value} €</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {new Date(rma.createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Reason */}
        <div className="rounded-md bg-muted/50 px-3 py-2">
          <p className="text-sm">
            <span className="font-medium">Motif :</span> {rma.reason}
          </p>
        </div>

        {/* Status Tracker */}
        <StatusTracker status={rma.status} />

        {/* Actions */}
        {(canProgress || canReject) && (
          <div className="flex items-center gap-2 pt-2 border-t">
            {canProgress && (
              <Button size="sm" onClick={() => onUpdateStatus(rma.id, nextStatus)} className="gap-1.5">
                Passer à "{workflowSteps.find((s) => s.key === nextStatus)?.label}"
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
            {canReject && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateStatus(rma.id, "rejected")}
                className="gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <XCircle className="h-4 w-4" />
                Refuser
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function RMAPage() {
  const [rmas, setRmas] = useState<RMARequest[]>(initialRMAs)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const updateStatus = (id: string, newStatus: RMAStatus) => {
    setRmas((prev) => prev.map((rma) => (rma.id === id ? { ...rma, status: newStatus } : rma)))
  }

  const stats = {
    total: rmas.length,
    pending: rmas.filter((r) => r.status === "pending").length,
    inProgress: rmas.filter((r) => ["approved", "in_transit", "received", "processed"].includes(r.status)).length,
    completed: rmas.filter((r) => r.status === "refunded").length,
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Retours produits (RMA)</h1>
          <p className="text-sm text-muted-foreground">Suivez et gérez les demandes de retour de vos clients.</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle demande
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Créer une demande RMA</DialogTitle>
              <DialogDescription>Renseignez les informations du produit à retourner.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="orderRef">Référence commande</Label>
                <Input id="orderRef" placeholder="CMD-XXXXX" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product">Produit</Label>
                <Input id="product" placeholder="Nom du produit" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantité</Label>
                  <Input id="quantity" type="number" defaultValue={1} min={1} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="value">Valeur (€)</Label>
                  <Input id="value" type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reason">Motif du retour</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un motif" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defect">Défaut de fabrication</SelectItem>
                    <SelectItem value="nonconform">Produit non conforme</SelectItem>
                    <SelectItem value="damaged">Produit endommagé</SelectItem>
                    <SelectItem value="error">Erreur de commande</SelectItem>
                    <SelectItem value="malfunction">Dysfonctionnement</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes additionnelles</Label>
                <Textarea id="notes" placeholder="Décrivez le problème en détail..." rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Créer la demande</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <PackageX className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/50">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">En attente</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/50">
              <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.inProgress}</p>
              <p className="text-xs text-muted-foreground">En cours</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.completed}</p>
              <p className="text-xs text-muted-foreground">Terminés</p>
            </div>
          </div>
        </Card>
      </div>

      {/* RMA Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {rmas.map((rma) => (
          <RMACard key={rma.id} rma={rma} onUpdateStatus={updateStatus} />
        ))}
      </div>
    </div>
  )
}
