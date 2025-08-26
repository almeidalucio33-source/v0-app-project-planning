"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, Bell, RefreshCw, AlertTriangle, CheckCircle, Clock, Plus, LinkIcon, Calendar } from "lucide-react"
import Link from "next/link"

const aircraftData = [
  {
    id: "EMB-712 Tupi",
    registration: "PT-NXJ",
    model: "EMB-712",
    manufacturer: "Embraer",
    serialNumber: "17280001",
    aircraftType: "Monomotor",
    manufacturingDate: "2020-05-15",
    cellHours: "14505.1",
    engineHours: "13046.3",
    maxPassengers: "4",
    fuelCapacity: "200",
    maxWeight: "1157",
    hourCycle: "1.0",
    torqueCycle: "1.0",
    slingCycle: "1.0",
    engine: {
      model: "Lycoming O-360-A4M",
      serial: "L-28552-36A",
      hours: "13046.3",
    },
    nextInspection: {
      type: "50H",
      date: "22/05/2025",
    },
    status: "available",
    components: [
      { id: "alt-001", name: "Altímetro United", pn: "5934 PAD", sn: "P9566", status: "Operacional" },
      { id: "trans-001", name: "Transponder KT 76A", pn: "066-1062-00", sn: "44134", status: "Operacional" },
    ],
    inspections: [
      { id: "insp-001", title: "Inspeção 50H - Célula", dueDate: "22/05/2025", status: "Pendente" },
      { id: "insp-002", title: "Lubrificação - Célula", dueDate: "22/05/2025", status: "Pendente" },
    ],
  },
  {
    id: "Cessna 172",
    registration: "PT-ABC",
    model: "C172",
    manufacturer: "Cessna",
    serialNumber: "17280002",
    aircraftType: "Monomotor",
    manufacturingDate: "2018-03-10",
    cellHours: "9820.5",
    engineHours: "7820.5",
    maxPassengers: "3",
    fuelCapacity: "180",
    maxWeight: "1043",
    hourCycle: "1.0",
    torqueCycle: "1.0",
    slingCycle: "1.0",
    engine: {
      model: "Lycoming IO-360J-2A",
      serial: "123456",
      hours: "7820.5",
    },
    nextInspection: {
      type: "100H",
      date: "15/09/2023",
    },
    status: "warning",
    components: [{ id: "gyro-001", name: "Giro Direcional", pn: "GD-450", sn: "GD789", status: "Manutenção" }],
    inspections: [{ id: "insp-003", title: "Inspeção 100H - Célula", dueDate: "15/09/2023", status: "Urgente" }],
  },
  {
    id: "Piper PA-34 Seneca",
    registration: "PT-DEF",
    model: "PA-34",
    manufacturer: "Piper",
    serialNumber: "34-8234001",
    aircraftType: "Bimotor",
    manufacturingDate: "2019-11-20",
    cellHours: "12340.8",
    engineHours: "10340.8",
    maxPassengers: "5",
    fuelCapacity: "380",
    maxWeight: "2073",
    hourCycle: "1.0",
    torqueCycle: "1.0",
    slingCycle: "1.0",
    engine: {
      model: "Continental TSIO-360",
      serial: "789012-L",
      hours: "10340.8",
    },
    nextInspection: {
      type: "Annual",
      date: "10/03/2024",
    },
    status: "overdue",
    components: [{ id: "prop-001", name: "Hélice McCauley", pn: "1A103", sn: "MC456", status: "Defeituoso" }],
    inspections: [{ id: "insp-004", title: "Inspeção Anual", dueDate: "10/03/2024", status: "Vencida" }],
  },
]

const componentsData = [
  {
    id: "alt-001",
    name: "Altímetro United",
    aircraft: "PT-NXJ",
    pn: "5934 PAD",
    sn: "P9566",
    status: "Operacional",
    nextRevision: "30/05/2025",
  },
  {
    id: "trans-001",
    name: "Transponder KT 76A",
    aircraft: "PT-NXJ",
    pn: "066-1062-00",
    sn: "44134",
    status: "Operacional",
    nextRevision: "30/05/2025",
  },
  {
    id: "gyro-001",
    name: "Giro Direcional",
    aircraft: "PT-ABC",
    pn: "GD-450",
    sn: "GD789",
    status: "Manutenção",
    nextRevision: "15/10/2024",
  },
  {
    id: "prop-001",
    name: "Hélice McCauley",
    aircraft: "PT-DEF",
    pn: "1A103",
    sn: "MC456",
    status: "Defeituoso",
    nextRevision: "01/12/2024",
  },
]

const inspectionsData = [
  {
    id: "insp-001",
    title: "Inspeção 50H - Célula",
    aircraft: "PT-NXJ",
    dueDate: "22/05/2025",
    status: "Pendente",
    type: "Célula",
  },
  {
    id: "insp-002",
    title: "Lubrificação - Célula",
    aircraft: "PT-NXJ",
    dueDate: "22/05/2025",
    status: "Pendente",
    type: "Célula",
  },
  {
    id: "insp-003",
    title: "Inspeção 100H - Célula",
    aircraft: "PT-ABC",
    dueDate: "15/09/2023",
    status: "Urgente",
    type: "Célula",
  },
  {
    id: "insp-004",
    title: "Inspeção Anual",
    aircraft: "PT-DEF",
    dueDate: "10/03/2024",
    status: "Vencida",
    type: "Geral",
  },
  {
    id: "insp-005",
    title: "Inspeção Motor - 500H",
    aircraft: "PT-NXJ",
    dueDate: "15/06/2025",
    status: "Pendente",
    type: "Motor",
  },
  {
    id: "insp-006",
    title: "Inspeção Hélice - 1000H",
    aircraft: "PT-DEF",
    dueDate: "20/07/2025",
    status: "Pendente",
    type: "Hélice",
  },
]

const metricsData = [
  {
    title: "Aeronaves",
    value: aircraftData.length.toString(),
    subtitle: "Aeronaves ativas",
    icon: Plane,
    color: "text-gray-600",
  },
  {
    title: "Inspeções Pendentes",
    value: inspectionsData.filter((i) => i.status === "Pendente").length.toString(),
    subtitle: "Inspeções a vencer",
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
  {
    title: "Inspeções Urgentes",
    value: inspectionsData.filter((i) => i.status === "Urgente" || i.status === "Vencida").length.toString(),
    subtitle: "Vencendo em 7 dias",
    icon: Clock,
    color: "text-red-600",
  },
  {
    title: "Status Geral",
    value: "78%",
    subtitle: "Aeronaves em conformidade",
    icon: CheckCircle,
    color: "text-green-600",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Todas")
  const [selectedAircraft, setSelectedAircraft] = useState<string | null>(null)

  const tabs = ["Todas", "Célula", "Motor", "Hélice", "Componentes", "ADs"]

  const filteredInspections = selectedAircraft
    ? inspectionsData.filter((inspection) => inspection.aircraft === selectedAircraft)
    : inspectionsData

  const calculateHealthStatus = () => {
    const totalInspections = inspectionsData.length
    const overdueInspections = inspectionsData.filter((i) => i.status === "Vencida").length
    const urgentInspections = inspectionsData.filter((i) => i.status === "Urgente").length

    if (overdueInspections > 0) return { status: "Crítico", color: "text-red-600", percentage: 25 }
    if (urgentInspections > 0) return { status: "Atenção", color: "text-yellow-600", percentage: 60 }
    return { status: "Saudável", color: "text-green-600", percentage: 85 }
  }

  const healthStatus = calculateHealthStatus()

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard de Manutenção</h1>
          {selectedAircraft && <p className="text-muted-foreground">Filtrando por: {selectedAircraft}</p>}
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Button className="bg-primary hover:bg-primary/90 text-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sincronizar
          </Button>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 md:p-6 border border-border mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">Saúde do Sistema</h3>
            <p className="text-sm text-muted-foreground">Status em tempo real da frota</p>
          </div>
          <div className="text-center md:text-right">
            <p className={`text-2xl font-bold ${healthStatus.color}`}>{healthStatus.percentage}%</p>
            <p className={`text-sm font-medium ${healthStatus.color}`}>{healthStatus.status}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Aircraft Inspection Status */}
          <div className="space-y-4">
            <h4 className="font-medium text-card-foreground">Status de Inspeções por Aeronave</h4>
            {aircraftData.map((aircraft, index) => {
              const aircraftInspections = inspectionsData.filter((i) => i.aircraft === aircraft.registration)
              const overdueCount = aircraftInspections.filter((i) => i.status === "Vencida").length
              const urgentCount = aircraftInspections.filter((i) => i.status === "Urgente").length
              const pendingCount = aircraftInspections.filter((i) => i.status === "Pendente").length
              const totalInspections = aircraftInspections.length

              const healthPercentage =
                totalInspections > 0
                  ? Math.round(((totalInspections - overdueCount - urgentCount) / totalInspections) * 100)
                  : 100

              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-card-foreground">{aircraft.registration}</span>
                    <span className="text-sm text-muted-foreground">{healthPercentage}%</span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        overdueCount > 0 ? "bg-red-500" : urgentCount > 0 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${healthPercentage}%` }}
                    />
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Pendentes: {pendingCount}</span>
                    <span>Urgentes: {urgentCount}</span>
                    <span>Vencidas: {overdueCount}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Fleet Availability */}
          <div className="space-y-4">
            <h4 className="font-medium text-card-foreground">Disponibilidade da Frota</h4>
            <div className="space-y-3">
              {aircraftData.map((aircraft, index) => {
                const isAvailable = aircraft.status === "available"
                const hasWarning = aircraft.status === "warning"
                const isOverdue = aircraft.status === "overdue"

                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          isAvailable ? "bg-green-500" : hasWarning ? "bg-yellow-500" : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-card-foreground">{aircraft.registration}</p>
                        <p className="text-xs text-muted-foreground">{aircraft.model}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${
                          isAvailable ? "text-green-600" : hasWarning ? "text-yellow-600" : "text-red-600"
                        }`}
                      >
                        {isAvailable ? "Disponível" : hasWarning ? "Atenção" : "Indisponível"}
                      </p>
                      <p className="text-xs text-muted-foreground">Próx: {aircraft.nextInspection.type}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Fleet Summary */}
            <div className="bg-muted rounded-lg p-4 mt-4">
              <h5 className="font-medium text-card-foreground mb-3">Resumo da Frota</h5>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {aircraftData.filter((a) => a.status === "available").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Disponíveis</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {aircraftData.filter((a) => a.status === "warning").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Atenção</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {aircraftData.filter((a) => a.status === "overdue").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Indisponíveis</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              healthStatus.status === "Crítico"
                ? "bg-red-500"
                : healthStatus.status === "Atenção"
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
            style={{ width: `${healthStatus.percentage}%` }}
          />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {metricsData.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-card-foreground text-sm md:text-base">{metric.title}</h3>
              <metric.icon className={`h-5 w-5 md:h-6 md:w-6 ${metric.color}`} />
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-bold text-card-foreground">{metric.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{metric.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Aircraft Cards */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-4">
          <h2 className="text-xl font-semibold text-foreground">Aeronaves</h2>
          <div className="flex gap-2">
            <Link href="/dashboard/aircraft/new">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nova Aeronave
              </Button>
            </Link>
            {selectedAircraft && (
              <Button variant="outline" size="sm" onClick={() => setSelectedAircraft(null)}>
                Limpar Filtro
              </Button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {aircraftData.map((aircraft, index) => (
            <div
              key={index}
              className={`bg-card rounded-xl p-4 md:p-6 border border-border status-${aircraft.status} cursor-pointer hover:bg-card/80 transition-colors ${
                selectedAircraft === aircraft.registration ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedAircraft(aircraft.registration)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-card-foreground text-sm md:text-base">{aircraft.id}</h3>
                <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
                  {aircraft.registration}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Modelo:</p>
                    <p className="font-medium text-card-foreground">{aircraft.model}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fabricante:</p>
                    <p className="font-medium text-card-foreground">{aircraft.manufacturer}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Horas Célula:</p>
                    <p className="font-semibold text-card-foreground">{aircraft.cellHours}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Max. Passageiros:</p>
                    <p className="font-medium text-card-foreground">{aircraft.maxPassengers}</p>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm font-medium text-primary mb-1">Motor LH</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Modelo:</span>
                      <span className="text-card-foreground">{aircraft.engine.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nº Série:</span>
                      <span className="text-card-foreground">{aircraft.engine.serial}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Horas:</span>
                      <span className="text-card-foreground">{aircraft.engine.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-primary">Componentes ({aircraft.components.length})</p>
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                      <LinkIcon className="h-3 w-3 mr-1" />
                      Vincular
                    </Button>
                  </div>
                  <div className="space-y-1 text-xs">
                    {aircraft.components.map((component, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-muted-foreground">{component.name}:</span>
                        <span
                          className={`font-medium ${
                            component.status === "Operacional"
                              ? "text-green-600"
                              : component.status === "Manutenção"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {component.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Próxima inspeção {aircraft.nextInspection.type}:</span>
                  <span className="text-card-foreground">{aircraft.nextInspection.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Components Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-4">
          <h2 className="text-xl font-semibold text-foreground">Gestão de Componentes</h2>
          <Link href="/dashboard/components/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo Componente
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {componentsData.map((component) => (
            <div key={component.id} className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-card-foreground text-sm">{component.name}</h4>
                <Badge variant={component.status === "Operacional" ? "default" : "destructive"} className="text-xs">
                  {component.status}
                </Badge>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">P/N:</span>
                  <span className="text-card-foreground">{component.pn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">S/N:</span>
                  <span className="text-card-foreground">{component.sn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Aeronave:</span>
                  <span className="text-card-foreground">{component.aircraft}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Próxima revisão:</span>
                  <span className="text-card-foreground">{component.nextRevision}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent text-xs">
                  Editar
                </Button>
                <Button size="sm" variant="destructive" className="flex-1 text-xs">
                  Remover
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Inspections */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 md:mb-6">
          Próximas Inspeções
          {selectedAircraft && ` - ${selectedAircraft}`}
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={`${activeTab === tab ? "bg-primary text-primary-foreground" : ""} whitespace-nowrap text-xs md:text-sm`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Inspections List */}
        <div className="space-y-4 md:space-y-6">
          {/* Hour-based Inspections */}
          {["50H", "100H", "200H", "500H", "1000H"].map((inspectionType) => {
            const typeInspections = filteredInspections.filter((inspection) =>
              inspection.title.includes(inspectionType),
            )

            if (typeInspections.length === 0) return null

            return (
              <div key={inspectionType} className="bg-card rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Inspeções de {inspectionType}
                </h3>
                <div className="space-y-2">
                  {typeInspections.map((inspection, index) => (
                    <div key={index} className="bg-muted rounded-lg p-3">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <p className="font-medium text-card-foreground text-sm">{inspection.title}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            Aeronave: {inspection.aircraft} • Vencimento: {inspection.dueDate}
                          </p>
                        </div>
                        <Badge
                          variant={
                            inspection.status === "Vencida"
                              ? "destructive"
                              : inspection.status === "Urgente"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs self-start md:self-center"
                        >
                          {inspection.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Day-based Inspections */}
          {["365D", "730D", "1460D"].map((inspectionType) => {
            const typeInspections = filteredInspections.filter(
              (inspection) =>
                inspection.title.includes(inspectionType) ||
                (inspectionType === "365D" && inspection.title.includes("Anual")),
            )

            if (typeInspections.length === 0) return null

            return (
              <div key={inspectionType} className="bg-card rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Inspeções de {inspectionType === "365D" ? "Anuais" : inspectionType}
                </h3>
                <div className="space-y-2">
                  {typeInspections.map((inspection, index) => (
                    <div key={index} className="bg-muted rounded-lg p-3">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <p className="font-medium text-card-foreground text-sm">{inspection.title}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            Aeronave: {inspection.aircraft} • Vencimento: {inspection.dueDate}
                          </p>
                        </div>
                        <Badge
                          variant={
                            inspection.status === "Vencida"
                              ? "destructive"
                              : inspection.status === "Urgente"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs self-start md:self-center"
                        >
                          {inspection.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* ADs Section */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Diretrizes de Aeronavegabilidade (ADs)
            </h3>
            <div className="space-y-2">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-card-foreground text-sm">AD Motor LH (E.U.A)</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Aeronave: PT-NXJ • Vencimento: 30/06/2025
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs self-start md:self-center">
                    Pendente
                  </Badge>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-card-foreground text-sm">AD Célula (BRASIL)</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Aeronave: PT-ABC • Vencimento: 15/08/2025
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs self-start md:self-center">
                    Pendente
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
