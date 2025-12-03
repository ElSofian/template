"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  ChevronRight,
  ChevronDown,
  FolderPlus,
  Upload,
  MoreHorizontal,
  Folder,
  FolderOpen,
  FileText,
  FileImage,
  FileSpreadsheet,
  File,
  Search,
  Plus,
  Trash2,
  Pencil,
  Download,
  Link2,
  Users,
  Building2,
} from "lucide-react"

// Types
interface FileItem {
  id: string
  name: string
  type: "pdf" | "doc" | "xls" | "img" | "md" | "other"
  size: string
  updatedAt: string
  from?: "vendor" | "client"
}

interface FolderItem {
  id: string
  name: string
  children: FolderItem[]
  files: FileItem[]
}

// Initial data
const initialDocFolders: FolderItem[] = [
  {
    id: "1",
    name: "Guide d'installation",
    children: [
      {
        id: "1-1",
        name: "Configuration matérielle",
        children: [],
        files: [
          { id: "f1", name: "Pré-requis serveur.pdf", type: "pdf", size: "1.2 Mo", updatedAt: "10/02/2025" },
          { id: "f2", name: "Schéma réseau.png", type: "img", size: "340 Ko", updatedAt: "08/02/2025" },
        ],
      },
      {
        id: "1-2",
        name: "Installation logicielle",
        children: [
          {
            id: "1-2-1",
            name: "Windows",
            children: [],
            files: [{ id: "f3", name: "Install_Windows.md", type: "md", size: "24 Ko", updatedAt: "12/02/2025" }],
          },
          {
            id: "1-2-2",
            name: "Linux",
            children: [],
            files: [{ id: "f4", name: "Install_Linux.md", type: "md", size: "28 Ko", updatedAt: "12/02/2025" }],
          },
        ],
        files: [],
      },
    ],
    files: [{ id: "f5", name: "Guide rapide.pdf", type: "pdf", size: "2.1 Mo", updatedAt: "15/02/2025" }],
  },
  {
    id: "2",
    name: "Manuel utilisateur",
    children: [
      {
        id: "2-1",
        name: "Prise en main",
        children: [],
        files: [
          { id: "f6", name: "Premiers pas.pdf", type: "pdf", size: "3.4 Mo", updatedAt: "01/02/2025" },
          { id: "f7", name: "Interface utilisateur.docx", type: "doc", size: "1.8 Mo", updatedAt: "28/01/2025" },
        ],
      },
      {
        id: "2-2",
        name: "Fonctionnalités avancées",
        children: [],
        files: [
          { id: "f8", name: "Automatisations.pdf", type: "pdf", size: "2.2 Mo", updatedAt: "05/02/2025" },
          { id: "f9", name: "API Reference.md", type: "md", size: "156 Ko", updatedAt: "10/02/2025" },
        ],
      },
    ],
    files: [],
  },
  {
    id: "3",
    name: "FAQ & Troubleshooting",
    children: [],
    files: [
      { id: "f10", name: "FAQ_complète.pdf", type: "pdf", size: "890 Ko", updatedAt: "20/01/2025" },
      { id: "f11", name: "Erreurs courantes.xlsx", type: "xls", size: "120 Ko", updatedAt: "18/01/2025" },
    ],
  },
  {
    id: "4",
    name: "Changelog",
    children: [],
    files: [
      { id: "f12", name: "Changelog v2.3.md", type: "md", size: "18 Ko", updatedAt: "12/02/2025" },
      { id: "f13", name: "Changelog v2.2.md", type: "md", size: "22 Ko", updatedAt: "05/01/2025" },
      { id: "f14", name: "Changelog v2.1.md", type: "md", size: "15 Ko", updatedAt: "10/12/2024" },
    ],
  },
]

const initialSharedFolders: FolderItem[] = [
  {
    id: "s1",
    name: "Contrats & Administratif",
    children: [],
    files: [
      { id: "sf1", name: "Contrat signé.pdf", type: "pdf", size: "1.3 Mo", updatedAt: "01/02/2025", from: "vendor" },
      { id: "sf2", name: "Annexe technique.pdf", type: "pdf", size: "890 Ko", updatedAt: "01/02/2025", from: "vendor" },
      { id: "sf3", name: "CGV acceptées.pdf", type: "pdf", size: "245 Ko", updatedAt: "28/01/2025", from: "client" },
    ],
  },
  {
    id: "s2",
    name: "Livrables projet",
    children: [
      {
        id: "s2-1",
        name: "Lot 1 – Setup initial",
        children: [],
        files: [
          {
            id: "sf4",
            name: "Rapport installation.pdf",
            type: "pdf",
            size: "2.1 Mo",
            updatedAt: "15/02/2025",
            from: "vendor",
          },
          {
            id: "sf5",
            name: "PV de recette.pdf",
            type: "pdf",
            size: "340 Ko",
            updatedAt: "16/02/2025",
            from: "client",
          },
        ],
      },
      {
        id: "s2-2",
        name: "Lot 2 – Intégrations",
        children: [],
        files: [
          {
            id: "sf6",
            name: "Specs API client.xlsx",
            type: "xls",
            size: "180 Ko",
            updatedAt: "10/02/2025",
            from: "client",
          },
          {
            id: "sf7",
            name: "Documentation API.pdf",
            type: "pdf",
            size: "1.5 Mo",
            updatedAt: "12/02/2025",
            from: "vendor",
          },
        ],
      },
      { id: "s2-3", name: "Lot 3 – Formation", children: [], files: [] },
    ],
    files: [],
  },
  {
    id: "s3",
    name: "Support & Échanges",
    children: [
      {
        id: "s3-1",
        name: "Tickets résolus",
        children: [],
        files: [
          {
            id: "sf8",
            name: "Ticket #1234 - Export.pdf",
            type: "pdf",
            size: "89 Ko",
            updatedAt: "08/02/2025",
            from: "vendor",
          },
        ],
      },
    ],
    files: [
      {
        id: "sf9",
        name: "Compte-rendu atelier 1.docx",
        type: "doc",
        size: "210 Ko",
        updatedAt: "22/01/2025",
        from: "vendor",
      },
      {
        id: "sf10",
        name: "Questions client.docx",
        type: "doc",
        size: "95 Ko",
        updatedAt: "25/01/2025",
        from: "client",
      },
    ],
  },
]

function getFileIcon(type: FileItem["type"]) {
  switch (type) {
    case "pdf":
      return <FileText className="h-4 w-4 text-red-500" />
    case "doc":
      return <FileText className="h-4 w-4 text-blue-500" />
    case "xls":
      return <FileSpreadsheet className="h-4 w-4 text-green-600" />
    case "img":
      return <FileImage className="h-4 w-4 text-purple-500" />
    case "md":
      return <FileText className="h-4 w-4 text-gray-500" />
    default:
      return <File className="h-4 w-4 text-muted-foreground" />
  }
}

// Folder Tree Component
function FolderTree({
  folders,
  selectedFolderId,
  onSelectFolder,
  expandedFolders,
  onToggleExpand,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  level = 0,
}: {
  folders: FolderItem[]
  selectedFolderId: string | null
  onSelectFolder: (folder: FolderItem) => void
  expandedFolders: Set<string>
  onToggleExpand: (id: string) => void
  onCreateFolder: (parentId: string | null) => void
  onRenameFolder: (folder: FolderItem) => void
  onDeleteFolder: (folder: FolderItem) => void
  level?: number
}) {
  return (
    <div className="space-y-0.5">
      {folders.map((folder) => {
        const isExpanded = expandedFolders.has(folder.id)
        const isSelected = selectedFolderId === folder.id
        const hasChildren = folder.children.length > 0

        return (
          <div key={folder.id}>
            <div
              className={`group flex items-center gap-1 rounded-md px-2 py-1.5 text-sm cursor-pointer transition-colors ${
                isSelected ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground"
              }`}
              style={{ paddingLeft: `${level * 12 + 8}px` }}
              onClick={() => onSelectFolder(folder)}
            >
              <button
                className="p-0.5 hover:bg-muted-foreground/10 rounded shrink-0"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleExpand(folder.id)
                }}
              >
                {hasChildren ? (
                  isExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  )
                ) : (
                  <span className="w-3.5" />
                )}
              </button>
              {isExpanded ? (
                <FolderOpen className="h-4 w-4 text-primary shrink-0" />
              ) : (
                <Folder className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <span className="truncate flex-1">{folder.name}</span>
              <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {folder.files.length}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="p-1 opacity-0 group-hover:opacity-100 hover:bg-muted-foreground/10 rounded transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onCreateFolder(folder.id)}>
                    <FolderPlus className="mr-2 h-4 w-4" />
                    Nouveau sous-dossier
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onRenameFolder(folder)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Renommer
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => onDeleteFolder(folder)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {hasChildren && isExpanded && (
              <FolderTree
                folders={folder.children}
                selectedFolderId={selectedFolderId}
                onSelectFolder={onSelectFolder}
                expandedFolders={expandedFolders}
                onToggleExpand={onToggleExpand}
                onCreateFolder={onCreateFolder}
                onRenameFolder={onRenameFolder}
                onDeleteFolder={onDeleteFolder}
                level={level + 1}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// File List Component
function FileList({
  files,
  showFrom = false,
  onDeleteFile,
}: {
  files: FileItem[]
  showFrom?: boolean
  onDeleteFile: (file: FileItem) => void
}) {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">Aucun fichier</p>
        <p className="text-xs text-muted-foreground mt-1">Ce dossier est vide. Ajoutez des fichiers pour commencer.</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {files.map((file) => (
        <div
          key={file.id}
          className="group flex items-center gap-3 rounded-lg border border-transparent hover:border-border hover:bg-muted/50 px-3 py-2.5 transition-all cursor-pointer"
        >
          <div className="shrink-0">{getFileIcon(file.type)}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {file.size} · {file.updatedAt}
            </p>
          </div>
          {showFrom && file.from && (
            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                file.from === "vendor" ? "bg-primary/10 text-primary" : "bg-green-500/10 text-green-600"
              }`}
            >
              {file.from === "vendor" ? <Building2 className="h-3 w-3" /> : <Users className="h-3 w-3" />}
              {file.from === "vendor" ? "Vendeur" : "Client"}
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-muted rounded transition-opacity">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link2 className="mr-2 h-4 w-4" />
                Copier le lien
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Renommer
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDeleteFile(file)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}

// Breadcrumb Component
function Breadcrumb({
  path,
  onNavigate,
}: {
  path: { id: string; name: string }[]
  onNavigate: (index: number) => void
}) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <button className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => onNavigate(-1)}>
        Tous les dossiers
      </button>
      {path.map((item, index) => (
        <div key={item.id} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <button
            className={`transition-colors ${
              index === path.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onNavigate(index)}
          >
            {item.name}
          </button>
        </div>
      ))}
    </div>
  )
}

// Main Component
export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState<"docs" | "shared">("docs")
  const [searchQuery, setSearchQuery] = useState("")

  // Documentation state
  const [docFolders, setDocFolders] = useState<FolderItem[]>(initialDocFolders)
  const [selectedDocFolder, setSelectedDocFolder] = useState<FolderItem | null>(null)
  const [expandedDocFolders, setExpandedDocFolders] = useState<Set<string>>(new Set(["1", "2"]))
  const [docPath, setDocPath] = useState<{ id: string; name: string }[]>([])

  // Shared state
  const [sharedFolders, setSharedFolders] = useState<FolderItem[]>(initialSharedFolders)
  const [selectedSharedFolder, setSelectedSharedFolder] = useState<FolderItem | null>(null)
  const [expandedSharedFolders, setExpandedSharedFolders] = useState<Set<string>>(new Set(["s2"]))
  const [sharedPath, setSharedPath] = useState<{ id: string; name: string }[]>([])

  // Dialog state
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [createFolderParentId, setCreateFolderParentId] = useState<string | null>(null)

  // Handlers
  const toggleExpand = (id: string, isShared: boolean) => {
    const setExpanded = isShared ? setExpandedSharedFolders : setExpandedDocFolders
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const findFolderPath = (
    folders: FolderItem[],
    targetId: string,
    currentPath: { id: string; name: string }[] = [],
  ): { id: string; name: string }[] | null => {
    for (const folder of folders) {
      const newPath = [...currentPath, { id: folder.id, name: folder.name }]
      if (folder.id === targetId) {
        return newPath
      }
      if (folder.children.length > 0) {
        const found = findFolderPath(folder.children, targetId, newPath)
        if (found) return found
      }
    }
    return null
  }

  const selectFolder = (folder: FolderItem, isShared: boolean) => {
    const folders = isShared ? sharedFolders : docFolders
    const setSelected = isShared ? setSelectedSharedFolder : setSelectedDocFolder
    const setPath = isShared ? setSharedPath : setDocPath

    setSelected(folder)
    const path = findFolderPath(folders, folder.id)
    if (path) setPath(path)
  }

  const navigateBreadcrumb = (index: number, isShared: boolean) => {
    const path = isShared ? sharedPath : docPath
    const setSelected = isShared ? setSelectedSharedFolder : setSelectedDocFolder
    const setPath = isShared ? setSharedPath : setDocPath
    const folders = isShared ? sharedFolders : docFolders

    if (index === -1) {
      setSelected(null)
      setPath([])
    } else {
      const targetId = path[index].id
      const findFolder = (folders: FolderItem[]): FolderItem | null => {
        for (const folder of folders) {
          if (folder.id === targetId) return folder
          if (folder.children.length > 0) {
            const found = findFolder(folder.children)
            if (found) return found
          }
        }
        return null
      }
      const folder = findFolder(folders)
      if (folder) {
        setSelected(folder)
        setPath(path.slice(0, index + 1))
      }
    }
  }

  const openCreateFolderDialog = (parentId: string | null) => {
    setCreateFolderParentId(parentId)
    setNewFolderName("")
    setIsCreateFolderOpen(true)
  }

  const createFolder = () => {
    if (!newFolderName.trim()) return

    const newFolder: FolderItem = {
      id: `new-${Date.now()}`,
      name: newFolderName.trim(),
      children: [],
      files: [],
    }

    const isShared = activeTab === "shared"
    const folders = isShared ? sharedFolders : docFolders
    const setFolders = isShared ? setSharedFolders : setDocFolders

    if (createFolderParentId === null) {
      setFolders([...folders, newFolder])
    } else {
      const addToParent = (items: FolderItem[]): FolderItem[] => {
        return items.map((item) => {
          if (item.id === createFolderParentId) {
            return { ...item, children: [...item.children, newFolder] }
          }
          if (item.children.length > 0) {
            return { ...item, children: addToParent(item.children) }
          }
          return item
        })
      }
      setFolders(addToParent(folders))
    }

    setIsCreateFolderOpen(false)
  }

  const getCurrentFiles = (isShared: boolean) => {
    const selected = isShared ? selectedSharedFolder : selectedDocFolder
    const folders = isShared ? sharedFolders : docFolders

    if (selected) {
      return selected.files
    }

    // Show all root files when no folder is selected
    return folders.flatMap((f) => f.files)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Documentation & Échanges</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez la documentation produit et l'espace de partage client
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "docs" | "shared")} className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="docs" className="gap-2">
                <FileText className="h-4 w-4" />
                Documentation produit
              </TabsTrigger>
              <TabsTrigger value="shared" className="gap-2">
                <Users className="h-4 w-4" />
                Espace partagé
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-9 w-[200px] sm:w-[260px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                    onClick={() => openCreateFolderDialog(null)}
                  >
                    <FolderPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Nouveau dossier</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Créer un nouveau dossier</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Label htmlFor="folder-name">Nom du dossier</Label>
                    <Input
                      id="folder-name"
                      placeholder="Mon nouveau dossier"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      className="mt-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") createFolder()
                      }}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateFolderOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={createFolder}>Créer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Importer</span>
              </Button>
            </div>
          </div>

          {/* Documentation Tab */}
          <TabsContent value="docs" className="mt-4">
            <div className="grid gap-4 lg:grid-cols-[280px,1fr]">
              {/* Sidebar */}
              <div className="rounded-xl border bg-card p-3">
                <div className="flex items-center justify-between mb-3 px-2">
                  <h3 className="text-sm font-medium text-foreground">Dossiers</h3>
                  <button className="p-1 hover:bg-muted rounded" onClick={() => openCreateFolderDialog(null)}>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <FolderTree
                  folders={docFolders}
                  selectedFolderId={selectedDocFolder?.id ?? null}
                  onSelectFolder={(f) => selectFolder(f, false)}
                  expandedFolders={expandedDocFolders}
                  onToggleExpand={(id) => toggleExpand(id, false)}
                  onCreateFolder={(parentId) => openCreateFolderDialog(parentId)}
                  onRenameFolder={() => {}}
                  onDeleteFolder={() => {}}
                />
              </div>

              {/* Content */}
              <div className="rounded-xl border bg-card p-4">
                <div className="mb-4">
                  <Breadcrumb path={docPath} onNavigate={(index) => navigateBreadcrumb(index, false)} />
                </div>
                <FileList files={getCurrentFiles(false)} onDeleteFile={() => {}} />
              </div>
            </div>
          </TabsContent>

          {/* Shared Tab */}
          <TabsContent value="shared" className="mt-4">
            <div className="grid gap-4 lg:grid-cols-[280px,1fr]">
              {/* Sidebar */}
              <div className="rounded-xl border bg-card p-3">
                <div className="flex items-center justify-between mb-3 px-2">
                  <h3 className="text-sm font-medium text-foreground">Dossiers partagés</h3>
                  <button className="p-1 hover:bg-muted rounded" onClick={() => openCreateFolderDialog(null)}>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <FolderTree
                  folders={sharedFolders}
                  selectedFolderId={selectedSharedFolder?.id ?? null}
                  onSelectFolder={(f) => selectFolder(f, true)}
                  expandedFolders={expandedSharedFolders}
                  onToggleExpand={(id) => toggleExpand(id, true)}
                  onCreateFolder={(parentId) => openCreateFolderDialog(parentId)}
                  onRenameFolder={() => {}}
                  onDeleteFolder={() => {}}
                />
              </div>

              {/* Content */}
              <div className="rounded-xl border bg-card p-4">
                <div className="mb-4 flex items-center justify-between">
                  <Breadcrumb path={sharedPath} onNavigate={(index) => navigateBreadcrumb(index, true)} />
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    Client & Vendeur
                  </div>
                </div>
                <FileList files={getCurrentFiles(true)} showFrom={true} onDeleteFile={() => {}} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
