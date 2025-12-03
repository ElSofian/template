"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  MoreHorizontal,
  Package,
  PackageX,
  Plus,
  RefreshCw,
  Search,
  Truck,
  XCircle,
} from "lucide-react"

type RMAStatus = "pending" | "approved" | "rejected" | "in_transit" | "received" | "processed" | "refunded"

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
    status: "approved",
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
    status: "in_transit",
    createdAt: "2024-03-04",
    customer: "SmartFactory SAS",
    value: 175,
  },
  {
    id: "RMA-2024-004",
    orderRef: "CMD-77654",
    product: "Kit câbles industriels",
    quantity: 2,
    reason: "Produit endommagé",
    status: "received",
    createdAt: "2024-03-01",
    customer: "AutomaTech",
    value: 95,
  },
  {
    id: "RMA-2024-005",
    orderRef: "CMD-77321",
    product: "Écran tactile 10 pouces",
    quantity: 1,
    reason: "Dysfonctionnement",
    status: "processed",
    createdAt: "2024-02-28",
    customer: "Interface Plus",
    value: 320,
  },
  {
    id: "RMA-2024-006",
    orderRef: "CMD-77100",
    product: "Relais programmable",
    quantity: 10,
    reason: "Défaut de fabrication",
    status: "refunded",
    createdAt: "2024-02-25",
    customer: "ElectroPro",
    value: 150,
  },
  {
    id: "RMA-2024-007",
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

const statusConfig: Record<RMAStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: {
    label: "En attente",
    color: "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
    icon: <Clock className="h-3 w-3" />,
  },
  approved: {
    label: "Approuvé",
    color: "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  rejected: {
    label: "Refusé",
    color: "border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300",
    icon: <XCircle className="h-3 w-3" />,
  },
  in_transit: {
    label: "En transit",
    color:
      "border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950/40 dark:text-purple-300",
    icon: <Truck className="h-3 w-3" />,
  },
  received: {
    label: "Reçu",
    color: "border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300",
    icon: <Package className="h-3 w-3" />,
  },
  processed: {
    label: "Traité",
    color:
      "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
    icon: <RefreshCw className="h-3 w-3" />,
  },
  refunded: {
    label: "Remboursé",
    color: "border-green-300 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
}

export default function RMAPage() {
  const [rmas, setRmas] = useState<RMARequest[]>(initialRMAs)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedRMA, setSelectedRMA] = useState<RMARequest | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const filteredRMAs = rmas.filter((rma) => {
    const matchesSearch =
      rma.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rma.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rma.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rma.orderRef.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || rma.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: rmas.length,
    pending: rmas.filter((r) => r.status === "pending").length,
    inProgress: rmas.filter((r) => ["approved", "in_transit", "received", "processed"].includes(r.status)).length,
    totalValue: rmas.filter((r) => r.status !== "rejected").reduce((acc, r) => acc + r.value, 0),
  }

  const updateStatus = (id: string, newStatus: RMAStatus) => {
    setRmas((prev) => prev.map((rma) => (rma.id === id ? { ...rma, status: newStatus } : rma)))
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Retours produits (RMA)</h1>
          <p className="text-sm text-muted-foreground">
            Gérez les demandes de retour, suivez leur statut et traitez les remboursements.
          </p>
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

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total demandes</CardDescription>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Toutes les demandes RMA</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>En attente</CardDescription>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">À traiter rapidement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>En cours</CardDescription>
            <RefreshCw className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Approuvées ou en transit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Valeur totale</CardDescription>
            <PackageX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalValue.toLocaleString("fr-FR")} €</div>
            <p className="text-xs text-muted-foreground">Hors demandes refusées</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Demandes de retour</CardTitle>
              <CardDescription>Liste des demandes RMA et leur statut actuel.</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="w-full pl-8 sm:w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="approved">Approuvé</SelectItem>
                  <SelectItem value="in_transit">En transit</SelectItem>
                  <SelectItem value="received">Reçu</SelectItem>
                  <SelectItem value="processed">Traité</SelectItem>
                  <SelectItem value="refunded">Remboursé</SelectItem>
                  <SelectItem value="rejected">Refusé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[450px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° RMA</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Produit</TableHead>
                  <TableHead className="hidden lg:table-cell">Qté</TableHead>
                  <TableHead className="hidden lg:table-cell">Valeur</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRMAs.map((rma) => {
                  const status = statusConfig[rma.status]
                  return (
                    <TableRow key={rma.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{rma.id}</span>
                          <span className="text-xs text-muted-foreground">{rma.orderRef}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{rma.customer}</TableCell>
                      <TableCell className="hidden max-w-[200px] truncate md:table-cell">{rma.product}</TableCell>
                      <TableCell className="hidden lg:table-cell">{rma.quantity}</TableCell>
                      <TableCell className="hidden lg:table-cell">{rma.value} €</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`gap-1 text-xs ${status.color}`}>
                          {status.icon}
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground md:table-cell">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          {new Date(rma.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedRMA(rma)}>Voir les détails</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {rma.status === "pending" && (
                              <>
                                <DropdownMenuItem onClick={() => updateStatus(rma.id, "approved")}>
                                  <CheckCircle2 className="mr-2 h-4 w-4 text-blue-500" />
                                  Approuver
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateStatus(rma.id, "rejected")}>
                                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                  Refuser
                                </DropdownMenuItem>
                              </>
                            )}
                            {rma.status === "approved" && (
                              <DropdownMenuItem onClick={() => updateStatus(rma.id, "in_transit")}>
                                <Truck className="mr-2 h-4 w-4" />
                                Marquer en transit
                              </DropdownMenuItem>
                            )}
                            {rma.status === "in_transit" && (
                              <DropdownMenuItem onClick={() => updateStatus(rma.id, "received")}>
                                <Package className="mr-2 h-4 w-4" />
                                Marquer comme reçu
                              </DropdownMenuItem>
                            )}
                            {rma.status === "received" && (
                              <DropdownMenuItem onClick={() => updateStatus(rma.id, "processed")}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Marquer comme traité
                              </DropdownMenuItem>
                            )}
                            {rma.status === "processed" && (
                              <DropdownMenuItem onClick={() => updateStatus(rma.id, "refunded")}>
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                Confirmer remboursement
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </ScrollArea>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t pt-4 mt-4">
            <p className="text-sm text-muted-foreground">{filteredRMAs.length} demande(s) affichée(s)</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ArrowLeft className="mr-1 h-4 w-4" />
                Précédent
              </Button>
              <Button variant="outline" size="sm" disabled>
                Suivant
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedRMA} onOpenChange={() => setSelectedRMA(null)}>
        <DialogContent className="sm:max-w-[550px]">
          {selectedRMA && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>{selectedRMA.id}</DialogTitle>
                  <Badge variant="outline" className={`gap-1 ${statusConfig[selectedRMA.status].color}`}>
                    {statusConfig[selectedRMA.status].icon}
                    {statusConfig[selectedRMA.status].label}
                  </Badge>
                </div>
                <DialogDescription>
                  Demande créée le{" "}
                  {new Date(selectedRMA.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Client</p>
                    <p className="font-medium">{selectedRMA.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Commande</p>
                    <p className="font-medium">{selectedRMA.orderRef}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Produit</p>
                  <p className="font-medium">{selectedRMA.product}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Quantité</p>
                    <p className="font-medium">{selectedRMA.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Valeur unitaire</p>
                    <p className="font-medium">{(selectedRMA.value / selectedRMA.quantity).toFixed(2)} €</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Valeur totale</p>
                    <p className="font-medium">{selectedRMA.value} €</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Motif du retour</p>
                  <p className="font-medium">{selectedRMA.reason}</p>
                </div>

                {/* Timeline */}
                <div className="mt-2">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Historique</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm font-medium">Demande créée</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(selectedRMA.createdAt).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                    {selectedRMA.status !== "pending" && selectedRMA.status !== "rejected" && (
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                        <div>
                          <p className="text-sm font-medium">Demande approuvée</p>
                          <p className="text-xs text-muted-foreground">Retour autorisé</p>
                        </div>
                      </div>
                    )}
                    {selectedRMA.status === "rejected" && (
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500" />
                        <div>
                          <p className="text-sm font-medium">Demande refusée</p>
                          <p className="text-xs text-muted-foreground">Retour non autorisé</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedRMA(null)}>
                  Fermer
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
