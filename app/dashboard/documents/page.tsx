"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload, Clock, AlertTriangle, CheckCircle, Trash2, Edit, ImageIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"

const documentsData = [
  {
    id: "doc-001",
    name: "Check VOR RBAC 91.171",
    type: "Certificação",
    aircraft: "PT-NXJ",
    issueDate: "24/12/2023",
    expiryDate: "24/12/2024",
    expiryType: "days",
    expiryValue: 365,
    status: "Válido",
    daysRemaining: 45,
    hasImage: true,
    description: "Verificação de equipamento VOR conforme RBAC 91.171",
  },
  {
    id: "doc-002",
    name: "FISTEL",
    type: "Licença",
    aircraft: "PT-NXJ",
    issueDate: "31/08/2024",
    expiryDate: "31/08/2025",
    expiryType: "days",
    expiryValue: 365,
    status: "Válido",
    daysRemaining: 120,
    hasImage: false,
    description: "Licença de funcionamento de estação de telecomunicações",
  },
  {
    id: "doc-003",
    name: "SEGURO RETA",
    type: "Seguro",
    aircraft: "PT-ABC",
    issueDate: "04/05/2023",
    expiryDate: "04/05/2024",
    expiryType: "days",
    expiryValue: 365,
    status: "Vencido",
    daysRemaining: -180,
    hasImage: true,
    description: "Seguro de responsabilidade civil do explorador ou transportador aéreo",
  },
  {
    id: "doc-004",
    name: "CVA",
    type: "Certificado",
    aircraft: "PT-DEF",
    issueDate: "25/03/2023",
    expiryDate: "25/03/2025",
    expiryType: "hours",
    expiryValue: 2000,
    status: "Válido",
    daysRemaining: 90,
    hasImage: false,
    description: "Certificado de Verificação de Aeronavegabilidade",
  },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(documentsData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [newDocument, setNewDocument] = useState({
    name: "",
    type: "",
    aircraft: "",
    issueDate: "",
    expiryDate: "",
    expiryType: "days",
    expiryValue: "",
    description: "",
    hasImage: false,
  })

  const getStatusColor = (status: string, daysRemaining: number) => {
    if (status === "Vencido") return "bg-red-100 border-red-200 text-red-800"
    if (daysRemaining <= 30) return "bg-yellow-100 border-yellow-200 text-yellow-800"
    return "bg-green-100 border-green-200 text-green-800"
  }

  const getStatusIcon = (status: string, daysRemaining: number) => {
    if (status === "Vencido") return <AlertTriangle className="h-4 w-4 text-red-600" />
    if (daysRemaining <= 30) return <Clock className="h-4 w-4 text-yellow-600" />
    return <CheckCircle className="h-4 w-4 text-green-600" />
  }

  const handleAddDocument = () => {
    const document = {
      id: `doc-${Date.now()}`,
      ...newDocument,
      status: "Válido",
      daysRemaining: 365, // Placeholder calculation
    }
    setDocuments([...documents, document])
    setNewDocument({
      name: "",
      type: "",
      aircraft: "",
      issueDate: "",
      expiryDate: "",
      expiryType: "days",
      expiryValue: "",
      description: "",
      hasImage: false,
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  const handleUpdateDocument = (document: any) => {
    setSelectedDocument(document)
    setNewDocument({
      name: document.name,
      type: document.type,
      aircraft: document.aircraft,
      issueDate: document.issueDate,
      expiryDate: document.expiryDate || "",
      expiryType: document.expiryType,
      expiryValue: document.expiryValue.toString(),
      description: document.description,
      hasImage: document.hasImage,
    })
    setIsUpdateDialogOpen(true)
  }

  const handleSaveUpdate = () => {
    const updatedDocuments = documents.map((doc) =>
      doc.id === selectedDocument.id
        ? {
            ...doc,
            ...newDocument,
            expiryValue: Number.parseInt(newDocument.expiryValue),
          }
        : doc,
    )
    setDocuments(updatedDocuments)
    setIsUpdateDialogOpen(false)
    setSelectedDocument(null)
    setNewDocument({
      name: "",
      type: "",
      aircraft: "",
      issueDate: "",
      expiryDate: "",
      expiryType: "days",
      expiryValue: "",
      description: "",
      hasImage: false,
    })
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Controle de Documentos</h1>
              <p className="text-muted-foreground">Gerencie documentos, certificados e licenças das aeronaves</p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Novo Documento</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Documento *</Label>
                  <Input
                    id="name"
                    value={newDocument.name}
                    onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                    placeholder="Ex: Check VOR RBAC 91.171"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo *</Label>
                  <Select
                    value={newDocument.type}
                    onValueChange={(value) => setNewDocument({ ...newDocument, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Certificação">Certificação</SelectItem>
                      <SelectItem value="Licença">Licença</SelectItem>
                      <SelectItem value="Seguro">Seguro</SelectItem>
                      <SelectItem value="Certificado">Certificado</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aircraft">Aeronave *</Label>
                  <Select
                    value={newDocument.aircraft}
                    onValueChange={(value) => setNewDocument({ ...newDocument, aircraft: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a aeronave" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PT-NXJ">PT-NXJ - EMB-712 Tupi</SelectItem>
                      <SelectItem value="PT-ABC">PT-ABC - Cessna 172</SelectItem>
                      <SelectItem value="PT-DEF">PT-DEF - Piper PA-34 Seneca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Data de Emissão *</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={newDocument.issueDate}
                    onChange={(e) => setNewDocument({ ...newDocument, issueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryType">Tipo de Vencimento</Label>
                  <Select
                    value={newDocument.expiryType}
                    onValueChange={(value) => setNewDocument({ ...newDocument, expiryType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">Dias</SelectItem>
                      <SelectItem value="hours">Horas</SelectItem>
                      <SelectItem value="years">Anos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryValue">Valor do Vencimento</Label>
                  <Input
                    id="expiryValue"
                    type="number"
                    value={newDocument.expiryValue}
                    onChange={(e) => setNewDocument({ ...newDocument, expiryValue: e.target.value })}
                    placeholder="Ex: 365, 2000, 2"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newDocument.description}
                    onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                    placeholder="Descrição do documento..."
                    rows={3}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Anexar Imagem</Label>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Selecionar Arquivo
                    </Button>
                    <span className="text-sm text-muted-foreground">JPG, PNG até 5MB</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddDocument}>Salvar Documento</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Atualizar Documentação</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="update-name">Documentação *</Label>
                  <Input
                    id="update-name"
                    value={newDocument.name}
                    onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                    placeholder="Ex: Check VOR RBAC 91.171"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-issueDate">Início da vigência *</Label>
                  <Input
                    id="update-issueDate"
                    type="date"
                    value={newDocument.issueDate}
                    onChange={(e) => setNewDocument({ ...newDocument, issueDate: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Anexar Documento</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <Button type="button" variant="outline" size="sm">
                      Clique para anexar
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">Formatos permitidos: JPG, PNG, PDF (até 5MB)</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveUpdate} className="bg-green-600 hover:bg-green-700">
                  Salvar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((document) => (
            <Card key={document.id} className={`${getStatusColor(document.status, document.daysRemaining)} border-2`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(document.status, document.daysRemaining)}
                    <CardTitle className="text-lg">{document.name}</CardTitle>
                  </div>
                  {document.hasImage && <ImageIcon className="h-4 w-4 text-muted-foreground" />}
                </div>
                <Badge variant="secondary" className="w-fit">
                  {document.type}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Aeronave:</p>
                    <p className="font-medium">{document.aircraft}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Requerimento/Validade:</p>
                    <p className="font-medium">{document.status}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Início da Vigência:</p>
                    <p className="font-medium">{document.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fim da Vigência:</p>
                    <p className="font-medium">{document.expiryDate}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Disponibilidade:</p>
                    <p className="font-medium">
                      {document.status === "Vencido"
                        ? `Vencido há ${Math.abs(document.daysRemaining)} dias`
                        : `${document.daysRemaining} dias restantes`}
                    </p>
                  </div>
                </div>

                {document.description && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">{document.description}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleUpdateDocument(document)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Atualizar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleDeleteDocument(document.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
