"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, Wrench, ArrowLeft } from "lucide-react"
import Link from "next/link"

const aircraftData = [
  {
    id: "EMB-712 Tupi",
    registration: "PT-NXJ",
    model: "EMB-712",
    components: [
      {
        id: "alt-001",
        name: "Altímetro United",
        pn: "5934 PAD",
        sn: "P9566",
        status: "Operacional",
        nextMaintenance: "30/05/2025",
        daysRemaining: 45,
      },
      {
        id: "trans-001",
        name: "Transponder KT 76A",
        pn: "066-1062-00",
        sn: "44134",
        status: "Operacional",
        nextMaintenance: "15/06/2025",
        daysRemaining: 61,
      },
      {
        id: "elt-001",
        name: "ELT (ESPECIAL 10)",
        pn: "65C34425EFFBFF",
        sn: "037168",
        status: "Operacional",
        nextMaintenance: "12/03/2026",
        daysRemaining: 108,
      },
    ],
  },
  {
    id: "Cessna 172",
    registration: "PT-ABC",
    model: "C172",
    components: [
      {
        id: "gyro-001",
        name: "Giro Direcional",
        pn: "GD-450",
        sn: "GD789",
        status: "Manutenção",
        nextMaintenance: "15/10/2024",
        daysRemaining: -30,
      },
      {
        id: "vor-001",
        name: "VOR Receiver",
        pn: "VOR-200",
        sn: "VR456",
        status: "Operacional",
        nextMaintenance: "20/07/2025",
        daysRemaining: 95,
      },
    ],
  },
  {
    id: "Piper PA-34 Seneca",
    registration: "PT-DEF",
    model: "PA-34",
    components: [
      {
        id: "prop-001",
        name: "Hélice McCauley",
        pn: "1A103",
        sn: "MC456",
        status: "Defeituoso",
        nextMaintenance: "01/12/2024",
        daysRemaining: -15,
      },
      {
        id: "fuel-001",
        name: "Fuel Flow Indicator",
        pn: "FF-300",
        sn: "FF789",
        status: "Operacional",
        nextMaintenance: "25/08/2025",
        daysRemaining: 130,
      },
    ],
  },
]

export default function ComponentsPage() {
  const [selectedAircraft, setSelectedAircraft] = useState<string | null>(null)

  const getNextMaintenanceComponent = (components: any[]) => {
    return components.reduce((closest, component) => {
      if (component.daysRemaining < closest.daysRemaining) {
        return component
      }
      return closest
    }, components[0])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operacional":
        return "text-green-600"
      case "Manutenção":
        return "text-yellow-600"
      case "Defeituoso":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Operacional":
        return "default"
      case "Manutenção":
        return "secondary"
      case "Defeituoso":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (selectedAircraft) {
    const aircraft = aircraftData.find((a) => a.registration === selectedAircraft)
    if (!aircraft) return null

    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={() => setSelectedAircraft(null)} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Componentes - {aircraft.registration}</h1>
              <p className="text-muted-foreground">
                {aircraft.model} • {aircraft.components.length} componentes instalados
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aircraft.components.map((component) => (
              <div key={component.id} className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-card-foreground">{component.name}</h3>
                  <Badge variant={getStatusBadgeVariant(component.status)}>{component.status}</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">P/N:</p>
                      <p className="font-medium text-card-foreground">{component.pn}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">S/N:</p>
                      <p className="font-medium text-card-foreground">{component.sn}</p>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-primary">Próxima Manutenção</p>
                      <span
                        className={`text-sm font-medium ${component.daysRemaining < 0 ? "text-red-600" : component.daysRemaining < 30 ? "text-yellow-600" : "text-green-600"}`}
                      >
                        {component.daysRemaining < 0
                          ? `${Math.abs(component.daysRemaining)} dias vencido`
                          : `${component.daysRemaining} dias`}
                      </span>
                    </div>
                    <p className="text-sm text-card-foreground">{component.nextMaintenance}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Wrench className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1">
                    Remover
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/dashboard/components/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Componente
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestão de Componentes</h1>
              <p className="text-muted-foreground">Visualize e gerencie componentes por aeronave</p>
            </div>
          </div>
          <Link href="/dashboard/components/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Componente
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aircraftData.map((aircraft) => {
            const nextMaintenanceComponent = getNextMaintenanceComponent(aircraft.components)
            const operationalCount = aircraft.components.filter((c) => c.status === "Operacional").length
            const maintenanceCount = aircraft.components.filter((c) => c.status === "Manutenção").length
            const defectiveCount = aircraft.components.filter((c) => c.status === "Defeituoso").length

            return (
              <div
                key={aircraft.registration}
                className="bg-card rounded-xl p-6 border border-border cursor-pointer hover:bg-card/80 transition-colors"
                onClick={() => setSelectedAircraft(aircraft.registration)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-card-foreground">{aircraft.id}</h3>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground">
                    {aircraft.registration}
                  </Badge>
                </div>

                <div className="space-y-4 mb-4">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-primary">Componentes Instalados</p>
                      <span className="text-lg font-bold text-card-foreground">{aircraft.components.length}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <p className="font-medium text-green-600">{operationalCount}</p>
                        <p className="text-muted-foreground">Operacionais</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-yellow-600">{maintenanceCount}</p>
                        <p className="text-muted-foreground">Manutenção</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-red-600">{defectiveCount}</p>
                        <p className="text-muted-foreground">Defeituosos</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-sm font-medium text-primary mb-2">Próxima Manutenção</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-card-foreground">{nextMaintenanceComponent.name}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">{nextMaintenanceComponent.nextMaintenance}</p>
                        <span
                          className={`text-xs font-medium ${nextMaintenanceComponent.daysRemaining < 0 ? "text-red-600" : nextMaintenanceComponent.daysRemaining < 30 ? "text-yellow-600" : "text-green-600"}`}
                        >
                          {nextMaintenanceComponent.daysRemaining < 0
                            ? `${Math.abs(nextMaintenanceComponent.daysRemaining)} dias vencido`
                            : `${nextMaintenanceComponent.daysRemaining} dias`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Clique para ver detalhes</span>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
