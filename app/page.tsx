"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { FolderPlus, FilePlus, Upload, MoreHorizontal, Folder, FileText, Link2, User, Users } from "lucide-react"

const productFolders = [
  {
    name: "Guide d'installation",
    children: [
      { name: "Matériel", children: [] },
      { name: "Logiciel", children: [] },
    ],
  },
  {
    name: "Manuel utilisateur",
    children: [
      { name: "Vue d'ensemble", children: [] },
      { name: "Fonctionnalités avancées", children: [] },
    ],
  },
  {
    name: "FAQ",
    children: [],
  },
]

const productFiles = [
  {
    name: "Guide rapide.pdf",
    size: "2.1 Mo",
    updatedAt: "12/02/2025",
    type: "PDF",
  },
  {
    name: "Changelog v2.3.md",
    size: "18 Ko",
    updatedAt: "10/02/2025",
    type: "Markdown",
  },
  {
    name: "Procédure de migration.docx",
    size: "540 Ko",
    updatedAt: "08/02/2025",
    type: "Word",
  },
]

const sharedFolders = [
  {
    name: "Contrat",
    children: [],
  },
  {
    name: "Livrables",
    children: [
      { name: "Lot 1 – Setup initial", children: [] },
      { name: "Lot 2 – Intégrations", children: [] },
    ],
  },
  {
    name: "Support",
    children: [],
  },
]

const sharedFiles = [
  {
    name: "Contrat signé.pdf",
    size: "1.3 Mo",
    updatedAt: "01/02/2025",
    type: "PDF",
    from: "Vendeur",
  },
  {
    name: "Pré-requis techniques.xlsx",
    size: "320 Ko",
    updatedAt: "28/01/2025",
    type: "Excel",
    from: "Client",
  },
  {
    name: "Compte-rendu atelier 1.docx",
    size: "210 Ko",
    updatedAt: "22/01/2025",
    type: "Word",
    from: "Vendeur",
  },
]

function FolderTree({
  folders,
}: {
  folders: { name: string; children: any[] }[]
}) {
  return (
    <ul className="space-y-1 text-sm">
      {folders.map((folder) => (
        <li key={folder.name}>
          <div className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted cursor-pointer">
            <Folder className="h-4 w-4 text-muted-foreground" />
            <span>{folder.name}</span>
          </div>
          {folder.children?.length > 0 && (
            <div className="ml-5 mt-1 border-l pl-3 border-border/60">
              <FolderTree folders={folder.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function DocumentationPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Documentation & échanges clients</h1>
          <p className="text-sm text-muted-foreground">
            Centralisation de la documentation produit et de l'espace partagé avec le client.
          </p>
        </div>
      </div>

      <Tabs defaultValue="docs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="docs">Documentation produit</TabsTrigger>
          <TabsTrigger value="shared">Espace partagé</TabsTrigger>
        </TabsList>

        {/* Onglet Documentation produit */}
        <TabsContent value="docs" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div>
                <CardTitle>Documentation produit</CardTitle>
                <CardDescription>Arborescence des guides, manuels et procédures pour ce produit.</CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Input placeholder="Rechercher dans la documentation..." className="w-[220px] md:w-[260px]" />
                <Button variant="outline" size="icon">
                  <Link2 className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <FolderPlus className="mr-2 h-4 w-4" />
                      Nouveau dossier
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FilePlus className="mr-2 h-4 w-4" />
                      Nouveau document
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Upload className="mr-2 h-4 w-4" />
                      Importer un fichier
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link2 className="mr-2 h-4 w-4" />
                      Copier le lien de la doc
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="grid gap-4 md:grid-cols-[260px,1fr]">
              {/* Arborescence */}
              <Card className="border-dashed">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Arborescence des dossiers</CardTitle>
                  <CardDescription className="text-xs">Dossiers & sous-dossiers de la documentation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[260px] pr-3">
                    <FolderTree folders={productFolders} />
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Liste des fichiers */}
              <Card className="border-dashed">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Fichiers</CardTitle>
                  <CardDescription className="text-xs">
                    Documentation disponible dans le dossier sélectionné.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {productFiles.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center justify-between gap-3 rounded-md border bg-card px-3 py-2 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium leading-none">{file.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {file.type} · {file.size} · modifié le {file.updatedAt}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ouvrir</DropdownMenuItem>
                          <DropdownMenuItem>Télécharger</DropdownMenuItem>
                          <DropdownMenuItem>Renommer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Espace partagé */}
        <TabsContent value="shared" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div>
                <CardTitle>Espace partagé vendeur / client</CardTitle>
                <CardDescription>Dossiers, livrables et documents échangés dans le cadre de ce projet.</CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Users className="h-3 w-3" />
                  Accès : Client & Vendeur
                </Badge>
                <Button size="sm" className="gap-2">
                  Déposer un fichier
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="grid gap-4 md:grid-cols-[260px,1fr]">
              {/* Arborescence espace partagé */}
              <Card className="border-dashed">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Dossiers partagés</CardTitle>
                  <CardDescription className="text-xs">Contrats, livrables et échanges de support.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[260px] pr-3">
                    <FolderTree folders={sharedFolders} />
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Liste des fichiers partagés */}
              <Card className="border-dashed">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Fichiers partagés</CardTitle>
                  <CardDescription className="text-xs">Documents déposés par le client ou le vendeur.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sharedFiles.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center justify-between gap-3 rounded-md border bg-card px-3 py-2 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium leading-none">{file.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {file.type} · {file.size} · modifié le {file.updatedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="gap-1 text-xs">
                          <User className="h-3 w-3" />
                          {file.from}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ouvrir</DropdownMenuItem>
                            <DropdownMenuItem>Télécharger</DropdownMenuItem>
                            <DropdownMenuItem>Copier le lien</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Retirer du partage</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
