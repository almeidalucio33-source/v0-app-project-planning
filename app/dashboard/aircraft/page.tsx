"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, LinkIcon, Edit, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

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

export default function AircraftPage() {
  const [selectedAircraft, setSelectedAircraft] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleEdit = (aircraft: any) => {
    setSelectedAircraft(aircraft)
    setShowEditModal(true)
  }

  const handleDetails = (aircraft: any) => {
    setSelectedAircraft(aircraft)
    setShowDetailsModal(true)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Gestão de Aeronaves</h1>
          <p className="text-muted-foreground">Visualize e gerencie todas as aeronaves da frota</p>
        </div>
        <Link href="/dashboard/aircraft/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Aeronave
          </Button>
        </Link>
      </div>

      {/* Aircraft Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {aircraftData.map((aircraft, index) => (
          <div
            key={index}
            className={`bg-card rounded-xl p-6 border border-border status-${aircraft.status} hover:bg-card/80 transition-colors`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-card-foreground">{aircraft.id}</h3>
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
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
                  <p className="text-muted-foreground">Tipo:</p>
                  <p className="font-medium text-card-foreground">{aircraft.aircraftType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Nº Série:</p>
                  <p className="font-medium text-card-foreground">{aircraft.serialNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Horas Célula:</p>
                  <p className="font-semibold text-card-foreground">{aircraft.cellHours}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Max. Passageiros:</p>
                  <p className="font-medium text-card-foreground">{aircraft.maxPassengers}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Capacidade Combustível:</p>
                  <p className="font-medium text-card-foreground">{aircraft.fuelCapacity}L</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Peso Máximo:</p>
                  <p className="font-medium text-card-foreground">{aircraft.maxWeight}kg</p>
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

              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm font-medium text-primary mb-2">Parâmetros de Ciclo</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <p className="text-muted-foreground">Hora</p>
                    <p className="font-medium text-card-foreground">{aircraft.hourCycle}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Torque</p>
                    <p className="font-medium text-card-foreground">{aircraft.torqueCycle}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Sling</p>
                    <p className="font-medium text-card-foreground">{aircraft.slingCycle}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-muted-foreground">Próxima inspeção {aircraft.nextInspection.type}:</span>
                <span className="text-card-foreground">{aircraft.nextInspection.date}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleEdit(aircraft)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleDetails(aircraft)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Detalhes
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedAircraft && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-card-foreground">Detalhes da Aeronave</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowDetailsModal(false)}>
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Identificação</p>
                    <p className="font-medium text-card-foreground">{selectedAircraft.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Matrícula</p>
                    <p className="font-medium text-card-foreground">{selectedAircraft.registration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Fabricação</p>
                    <p className="font-medium text-card-foreground">{selectedAircraft.manufacturingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Horas do Motor</p>
                    <p className="font-medium text-card-foreground">{selectedAircraft.engineHours}</p>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-medium text-primary mb-2">Componentes Instalados</h3>
                  <div className="space-y-2">
                    {selectedAircraft.components.map((component: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-background rounded">
                        <div>
                          <p className="font-medium text-card-foreground">{component.name}</p>
                          <p className="text-xs text-muted-foreground">
                            P/N: {component.pn} | S/N: {component.sn}
                          </p>
                        </div>
                        <Badge variant={component.status === "Operacional" ? "default" : "destructive"}>
                          {component.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-medium text-primary mb-2">Inspeções Pendentes</h3>
                  <div className="space-y-2">
                    {selectedAircraft.inspections.map((inspection: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-background rounded">
                        <div>
                          <p className="font-medium text-card-foreground">{inspection.title}</p>
                          <p className="text-xs text-muted-foreground">Vencimento: {inspection.dueDate}</p>
                        </div>
                        <Badge variant={inspection.status === "Pendente" ? "secondary" : "destructive"}>
                          {inspection.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedAircraft && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-card-foreground">Editar Aeronave</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowEditModal(false)}>
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Matrícula</label>
                    <input
                      type="text"
                      defaultValue={selectedAircraft.registration}
                      className="w-full p-2 border border-border rounded bg-background text-card-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Modelo</label>
                    <input
                      type="text"
                      defaultValue={selectedAircraft.model}
                      className="w-full p-2 border border-border rounded bg-background text-card-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Horas Célula</label>
                    <input
                      type="text"
                      defaultValue={selectedAircraft.cellHours}
                      className="w-full p-2 border border-border rounded bg-background text-card-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Horas Motor</label>
                    <input
                      type="text"
                      defaultValue={selectedAircraft.engineHours}
                      className="w-full p-2 border border-border rounded bg-background text-card-foreground"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      // Aqui seria implementada a lógica de salvamento
                      setShowEditModal(false)
                    }}
                  >
                    Salvar Alterações
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowEditModal(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
