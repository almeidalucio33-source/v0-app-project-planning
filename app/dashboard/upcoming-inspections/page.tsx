"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Clock,
  Calendar,
  AlertTriangle,
  FileText,
  Package,
  Home,
  Plane,
  ClipboardList,
  History,
  RefreshCw,
  Heart,
  User,
  Sun,
  Moon,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

const aircraftData = [
  { id: "PT-NXJ", name: "EMB-712 Tupi" },
  { id: "PT-ABC", name: "Cessna 172" },
  { id: "PT-DEF", name: "Piper PA-34 Seneca" },
]

const inspectionsData = [
  {
    id: "insp-001",
    title: "Inspeção 50H - Célula",
    aircraft: "PT-NXJ",
    dueDate: "22/05/2025",
    status: "Pendente",
    type: "Célula",
    group: "50H",
    lastService: "N/A",
    available: "290",
    predicted: "12/06/2025",
    daysRemaining: "45",
    justification: null,
    notPerformed: false,
  },
  {
    id: "insp-002",
    title: "Lubrificação - Célula",
    aircraft: "PT-NXJ",
    dueDate: "22/05/2025",
    status: "Pendente",
    type: "Célula",
    group: "50H",
    lastService: "N/A",
    available: "290",
    predicted: "12/06/2025",
    daysRemaining: "45",
    justification: null,
    notPerformed: false,
  },
  {
    id: "insp-003",
    title: "Inspeção 100H - Célula",
    aircraft: "PT-ABC",
    dueDate: "15/09/2023",
    status: "Urgente",
    type: "Célula",
    group: "100H",
    lastService: "15/09/2023",
    available: "0",
    predicted: "15/09/2023",
    daysRemaining: "-120",
    justification: null,
    notPerformed: false,
  },
  {
    id: "insp-004",
    title: "Inspeção Anual",
    aircraft: "PT-DEF",
    dueDate: "10/03/2024",
    status: "Vencida",
    type: "Geral",
    group: "365D",
    lastService: "10/03/2023",
    available: "0",
    predicted: "10/03/2024",
    daysRemaining: "-90",
    justification: null,
    notPerformed: false,
  },
  {
    id: "insp-005",
    title: "Inspeção Motor - 500H",
    aircraft: "PT-NXJ",
    dueDate: "15/06/2025",
    status: "Pendente",
    type: "Motor",
    group: "500H",
    lastService: "N/A",
    available: "150",
    predicted: "20/06/2025",
    daysRemaining: "60",
    justification: null,
    notPerformed: false,
  },
  {
    id: "insp-006",
    title: "Inspeção Hélice - 1000H",
    aircraft: "PT-DEF",
    dueDate: "20/07/2025",
    status: "Pendente",
    type: "Hélice",
    group: "1000H",
    lastService: "N/A",
    available: "200",
    predicted: "25/07/2025",
    daysRemaining: "75",
    justification: null,
    notPerformed: false,
  },
]

const adsData = [
  {
    id: "ad-001",
    title: "AD Motor LH (E.U.A)",
    aircraft: "PT-NXJ",
    dueDate: "30/06/2025",
    status: "Pendente",
    type: "ADs",
    group: "Motor",
    lastService: "N/A",
    available: "180",
    predicted: "05/07/2025",
    daysRemaining: "65",
    justification: null,
    notPerformed: false,
  },
  {
    id: "ad-002",
    title: "AD Célula (BRASIL)",
    aircraft: "PT-ABC",
    dueDate: "15/08/2025",
    status: "Pendente",
    type: "ADs",
    group: "Célula",
    lastService: "N/A",
    available: "220",
    predicted: "20/08/2025",
    daysRemaining: "85",
    justification: null,
    notPerformed: false,
  },
]

export default function UpcomingInspectionsPage() {
  const [activeTab, setActiveTab] = useState("Todas")
  const [selectedAircraft, setSelectedAircraft] = useState<string>("all")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedInspection, setSelectedInspection] = useState<any>(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [inspections, setInspections] = useState([...inspectionsData, ...adsData])

  const tabs = ["Todas", "Célula", "Motor", "Hélice", "Componentes", "ADs"]

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const filteredInspections = inspections.filter((inspection) => {
    const aircraftMatch = selectedAircraft === "all" || inspection.aircraft === selectedAircraft
    const typeMatch = activeTab === "Todas" || inspection.type === activeTab
    return aircraftMatch && typeMatch
  })

  const groupedInspections = filteredInspections.reduce(
    (groups, inspection) => {
      const group = inspection.group
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(inspection)
      return groups
    },
    {} as Record<string, any[]>,
  )

  const handleInspectionClick = (inspection: any) => {
    setSelectedInspection(inspection)
    setIsUpdateModalOpen(true)
  }

  const handleUpdateInspection = (updatedData: any) => {
    setInspections((prev) =>
      prev.map((insp) =>
        insp.id === selectedInspection.id
          ? {
              ...insp,
              ...updatedData,
              status: updatedData.notPerformed ? "Não Realizada" : "Concluída",
            }
          : insp,
      ),
    )
    setIsUpdateModalOpen(false)
    setSelectedInspection(null)
  }

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-80 bg-sidebar border-r border-sidebar-border p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary rounded-full p-2">
            <Plane className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">AeroManager</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Sun className="h-4 w-4 text-sidebar-foreground" />
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-8 w-12 p-0 relative bg-muted">
              <div
                className={`absolute w-4 h-4 bg-primary rounded-full transition-transform ${
                  isDarkMode ? "translate-x-3" : "translate-x-1"
                }`}
              />
            </Button>
            <Moon className="h-4 w-4 text-sidebar-foreground" />
          </div>
        </div>

        {/* User Profile */}
        <div className="bg-sidebar-accent rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full p-2">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sidebar-foreground">Bruno Fernando</p>
              <p className="text-sm text-sidebar-foreground/70">Técnico de Manutenção</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <Link href="/dashboard" className="nav-item">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/dashboard/aircraft/new" className="nav-item">
            <Plane className="h-5 w-5" />
            <span>Aeronaves</span>
          </Link>
          <Link href="/dashboard/inspection-maps" className="nav-item">
            <ClipboardList className="h-5 w-5" />
            <span>Inspeções</span>
          </Link>
          <Link href="/dashboard/upcoming-inspections" className="nav-item active">
            <Clock className="h-5 w-5" />
            <span>Próximas Inspeções</span>
          </Link>
          <Link href="/dashboard/components/new" className="nav-item">
            <Package className="h-5 w-5" />
            <span>Componentes</span>
          </Link>
          <Link href="/dashboard/documents" className="nav-item">
            <FileText className="h-5 w-5" />
            <span>Documentos</span>
          </Link>
          <Link href="/dashboard/history" className="nav-item">
            <History className="h-5 w-5" />
            <span>Histórico</span>
          </Link>
          <div className="nav-item">
            <Heart className="h-5 w-5" />
            <span>Saúde</span>
          </div>
          <Link href="/dashboard/sync" className="nav-item">
            <RefreshCw className="h-5 w-5" />
            <span>Sincronizar</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
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
              <h1 className="text-3xl font-bold text-foreground">Próximas Inspeções</h1>
              <p className="text-muted-foreground">Gerencie e acompanhe todas as inspeções programadas</p>
            </div>
          </div>
        </div>

        {/* Aircraft Selector */}
        <div className="mb-6">
          <Label htmlFor="aircraft-select" className="text-sm font-medium text-foreground mb-2 block">
            Selecionar Aeronave:
          </Label>
          <Select value={selectedAircraft} onValueChange={setSelectedAircraft}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Selecione uma aeronave" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Aeronaves</SelectItem>
              {aircraftData.map((aircraft) => (
                <SelectItem key={aircraft.id} value={aircraft.id}>
                  {aircraft.id} - {aircraft.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg w-fit">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Inspections List */}
        <div className="space-y-6">
          {Object.entries(groupedInspections).map(([group, groupInspections]) => (
            <div key={group} className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                {group.includes("H") ? (
                  <Clock className="h-5 w-5 text-primary" />
                ) : group.includes("D") || group === "365D" ? (
                  <Calendar className="h-5 w-5 text-primary" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-primary" />
                )}
                Inspeções de {group === "365D" ? "Anuais" : group}
              </h3>
              <div className="space-y-3">
                {groupInspections.map((inspection) => (
                  <div key={inspection.id} className="space-y-2">
                    <div
                      className="bg-muted rounded-lg p-4 cursor-pointer hover:bg-muted/80 transition-colors"
                      onClick={() => handleInspectionClick(inspection)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="font-medium text-card-foreground">{inspection.title}</p>
                            <Badge
                              variant={
                                inspection.status === "Vencida" || inspection.status === "Urgente"
                                  ? "destructive"
                                  : inspection.status === "Não Realizada"
                                    ? "secondary"
                                    : inspection.status === "Concluída"
                                      ? "default"
                                      : "secondary"
                              }
                              className="text-xs"
                            >
                              {inspection.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Aeronave:</span>
                              <p className="font-medium text-card-foreground">{inspection.aircraft}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Último Serviço:</span>
                              <p className="font-medium text-card-foreground">{inspection.lastService}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Disponível:</span>
                              <p className="font-medium text-card-foreground">{inspection.available}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Previsto:</span>
                              <p className="font-medium text-card-foreground">{inspection.predicted}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Dias Restantes:</span>
                              <p
                                className={`font-medium ${
                                  Number.parseInt(inspection.daysRemaining) < 0
                                    ? "text-red-600"
                                    : Number.parseInt(inspection.daysRemaining) < 30
                                      ? "text-yellow-600"
                                      : "text-green-600"
                                }`}
                              >
                                {inspection.daysRemaining}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {inspection.justification && (
                      <div className="ml-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          <strong>Justificativa:</strong> {inspection.justification}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Atualizar Inspeção</DialogTitle>
            </DialogHeader>
            {selectedInspection && (
              <InspectionUpdateForm
                inspection={selectedInspection}
                onUpdate={handleUpdateInspection}
                onCancel={() => setIsUpdateModalOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

function InspectionUpdateForm({
  inspection,
  onUpdate,
  onCancel,
}: {
  inspection: any
  onUpdate: (data: any) => void
  onCancel: () => void
}) {
  const [serviceDate, setServiceDate] = useState("")
  const [referenceValue, setReferenceValue] = useState("")
  const [unit, setUnit] = useState("FH")
  const [notPerformed, setNotPerformed] = useState(false)
  const [justification, setJustification] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({
      serviceDate,
      referenceValue,
      unit,
      notPerformed,
      justification: notPerformed ? justification : null,
    })
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-muted rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-card-foreground">{inspection.title}</h3>
            <Badge variant="outline" className="text-xs">
              REF: {inspection.id.toUpperCase()}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Aeronave:</span>
              <p className="font-medium text-card-foreground">{inspection.aircraft}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Tipo:</span>
              <p className="font-medium text-card-foreground">{inspection.type}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Intervalo:</span>
              <p className="font-medium text-card-foreground">{inspection.group}</p>
            </div>
          </div>

          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-card-foreground text-sm">
                {inspection.type === "Célula"
                  ? "CÉLULA"
                  : inspection.type === "Motor"
                    ? "MOTOR LH"
                    : inspection.type === "Hélice"
                      ? "HÉLICE"
                      : "COMPONENTE"}
              </h4>
              <Button size="sm" variant="outline" className="text-xs bg-transparent h-7">
                ATUALIZAR CARTÃO
              </Button>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-green-700 dark:text-green-300">S/N:</span>
                  <p className="font-medium text-green-800 dark:text-green-200">037168</p>
                </div>
                <div>
                  <span className="text-green-700 dark:text-green-300">Instalação:</span>
                  <p className="font-medium text-green-800 dark:text-green-200">12/03/2025</p>
                </div>
                <div>
                  <span className="text-green-700 dark:text-green-300">Último Serviço:</span>
                  <p className="font-medium text-green-800 dark:text-green-200">{inspection.lastService}</p>
                </div>
                <div>
                  <span className="text-green-700 dark:text-green-300">Disponível:</span>
                  <p className="font-medium text-green-800 dark:text-green-200">{inspection.available}D</p>
                </div>
                <div>
                  <span className="text-green-700 dark:text-green-300">Previsto:</span>
                  <p className="font-medium text-green-800 dark:text-green-200">{inspection.predicted}</p>
                </div>
                <div>
                  <span className="text-green-700 dark:text-green-300">Dias Restantes:</span>
                  <p
                    className={`font-medium ${
                      Number.parseInt(inspection.daysRemaining) < 0
                        ? "text-red-600"
                        : Number.parseInt(inspection.daysRemaining) < 30
                          ? "text-yellow-600"
                          : "text-green-600"
                    }`}
                  >
                    {inspection.daysRemaining}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="service-date" className="text-sm">
              Data do Serviço
            </Label>
            <Input
              id="service-date"
              type="date"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
              required={!notPerformed}
              className="h-9"
            />
          </div>
          <div>
            <Label htmlFor="reference-value" className="text-sm">
              Valor Referente
            </Label>
            <Input
              id="reference-value"
              type="number"
              value={referenceValue}
              onChange={(e) => setReferenceValue(e.target.value)}
              placeholder="Ex: 1500"
              required={!notPerformed}
              className="h-9"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="unit" className="text-sm">
            Unidade
          </Label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FH">FH (Flight Hours)</SelectItem>
              <SelectItem value="D">D (Days)</SelectItem>
              <SelectItem value="C">C (Cycles)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="not-performed" checked={notPerformed} onChange={(e) => setNotPerformed(e.target.checked)} />
          <Label htmlFor="not-performed" className="text-sm">
            Não realizar esta inspeção
          </Label>
        </div>

        {notPerformed && (
          <div>
            <Label htmlFor="justification" className="text-sm">
              Justificativa (obrigatório)
            </Label>
            <Textarea
              id="justification"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Explique o motivo para não realizar esta inspeção..."
              required={notPerformed}
              rows={2}
              className="resize-none"
            />
          </div>
        )}

        <div className="flex gap-3 pt-3 border-t border-border">
          <Button type="submit" className="flex-1 h-9">
            {notPerformed ? "Marcar como Não Realizada" : "Atualizar Inspeção"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="h-9 bg-transparent">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
