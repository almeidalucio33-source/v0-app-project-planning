"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Activity, ArrowLeft } from "lucide-react"
import Link from "next/link"

const aircraftHealthData = [
  {
    registration: "PT-NXJ",
    model: "EMB-712 Tupi",
    overallHealth: 85,
    status: "Saudável",
    inspections: {
      cell: { progress: 75, nextDue: "22/05/2025", daysRemaining: 45 },
      engine: { progress: 60, nextDue: "15/06/2025", daysRemaining: 61 },
      propeller: { progress: 90, nextDue: "30/07/2025", daysRemaining: 106 },
      components: { progress: 80, nextDue: "12/03/2026", daysRemaining: 108 },
      ads: { progress: 95, nextDue: "30/06/2025", daysRemaining: 76 },
    },
    components: {
      operational: 8,
      maintenance: 1,
      defective: 0,
    },
  },
  {
    registration: "PT-ABC",
    model: "Cessna 172",
    overallHealth: 60,
    status: "Atenção",
    inspections: {
      cell: { progress: 45, nextDue: "15/09/2023", daysRemaining: -30 },
      engine: { progress: 70, nextDue: "20/07/2025", daysRemaining: 95 },
      propeller: { progress: 85, nextDue: "25/08/2025", daysRemaining: 130 },
      components: { progress: 40, nextDue: "15/10/2024", daysRemaining: -30 },
      ads: { progress: 80, nextDue: "15/08/2025", daysRemaining: 120 },
    },
    components: {
      operational: 5,
      maintenance: 2,
      defective: 1,
    },
  },
  {
    registration: "PT-DEF",
    model: "Piper PA-34 Seneca",
    overallHealth: 25,
    status: "Crítico",
    inspections: {
      cell: { progress: 20, nextDue: "10/03/2024", daysRemaining: -60 },
      engine: { progress: 30, nextDue: "01/12/2024", daysRemaining: -15 },
      propeller: { progress: 15, nextDue: "01/12/2024", daysRemaining: -15 },
      components: { progress: 25, nextDue: "25/08/2025", daysRemaining: 130 },
      ads: { progress: 50, nextDue: "15/11/2024", daysRemaining: 20 },
    },
    components: {
      operational: 3,
      maintenance: 1,
      defective: 3,
    },
  },
]

export default function HealthPage() {
  const [selectedAircraft, setSelectedAircraft] = useState<string | null>(null)

  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-green-600"
    if (health >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getHealthBgColor = (health: number) => {
    if (health >= 80) return "bg-green-500"
    if (health >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getProgressColor = (progress: number, daysRemaining: number) => {
    if (daysRemaining < 0) return "bg-red-500"
    if (daysRemaining < 30) return "bg-yellow-500"
    return "bg-green-500"
  }

  const fleetOverallHealth = Math.round(
    aircraftHealthData.reduce((sum, aircraft) => sum + aircraft.overallHealth, 0) / aircraftHealthData.length,
  )

  const fleetStats = {
    available: aircraftHealthData.filter((a) => a.overallHealth >= 80).length,
    attention: aircraftHealthData.filter((a) => a.overallHealth >= 60 && a.overallHealth < 80).length,
    critical: aircraftHealthData.filter((a) => a.overallHealth < 60).length,
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
              <h1 className="text-3xl font-bold text-foreground">Saúde da Frota</h1>
              <p className="text-muted-foreground">Monitoramento em tempo real do status das aeronaves</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className={`text-2xl font-bold ${getHealthColor(fleetOverallHealth)}`}>{fleetOverallHealth}%</p>
              <p className="text-sm text-muted-foreground">Saúde Geral</p>
            </div>
          </div>
        </div>

        {/* Fleet Overview */}
        <div className="bg-card rounded-xl p-6 border border-border mb-8">
          <h2 className="text-xl font-semibold text-card-foreground mb-6">Resumo da Frota</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{fleetStats.available}</p>
              <p className="text-sm text-muted-foreground">Aeronaves Saudáveis</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-yellow-600">{fleetStats.attention}</p>
              <p className="text-sm text-muted-foreground">Requer Atenção</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Activity className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{fleetStats.critical}</p>
              <p className="text-sm text-muted-foreground">Estado Crítico</p>
            </div>
          </div>

          <div className="bg-muted rounded-full h-4 mb-2">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${getHealthBgColor(fleetOverallHealth)}`}
              style={{ width: `${fleetOverallHealth}%` }}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground">Saúde Geral da Frota: {fleetOverallHealth}%</p>
        </div>

        {/* Aircraft Health Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {aircraftHealthData.map((aircraft) => (
            <div key={aircraft.registration} className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-card-foreground">{aircraft.model}</h3>
                  <p className="text-sm text-muted-foreground">{aircraft.registration}</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getHealthColor(aircraft.overallHealth)}`}>
                    {aircraft.overallHealth}%
                  </p>
                  <Badge
                    variant={
                      aircraft.status === "Saudável"
                        ? "default"
                        : aircraft.status === "Atenção"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {aircraft.status}
                  </Badge>
                </div>
              </div>

              {/* Health Progress Bar */}
              <div className="bg-muted rounded-full h-2 mb-6">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getHealthBgColor(aircraft.overallHealth)}`}
                  style={{ width: `${aircraft.overallHealth}%` }}
                />
              </div>

              {/* Inspection Status */}
              <div className="space-y-3 mb-4">
                <h4 className="font-medium text-card-foreground">Status das Inspeções</h4>

                {Object.entries(aircraft.inspections).map(([type, data]) => (
                  <div key={type} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground capitalize">
                        {type === "cell"
                          ? "Célula"
                          : type === "engine"
                            ? "Motor"
                            : type === "propeller"
                              ? "Hélice"
                              : type === "components"
                                ? "Componentes"
                                : "ADs"}
                      </span>
                      <span
                        className={`font-medium ${data.daysRemaining < 0 ? "text-red-600" : data.daysRemaining < 30 ? "text-yellow-600" : "text-green-600"}`}
                      >
                        {data.daysRemaining < 0 ? `${Math.abs(data.daysRemaining)}d vencido` : `${data.daysRemaining}d`}
                      </span>
                    </div>
                    <div className="bg-muted rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(data.progress, data.daysRemaining)}`}
                        style={{ width: `${data.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Components Status */}
              <div className="bg-muted rounded-lg p-3">
                <h5 className="font-medium text-card-foreground mb-2">Componentes</h5>
                <div className="grid grid-cols-3 gap-2 text-xs text-center">
                  <div>
                    <p className="font-medium text-green-600">{aircraft.components.operational}</p>
                    <p className="text-muted-foreground">Operacionais</p>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-600">{aircraft.components.maintenance}</p>
                    <p className="text-muted-foreground">Manutenção</p>
                  </div>
                  <div>
                    <p className="font-medium text-red-600">{aircraft.components.defective}</p>
                    <p className="text-muted-foreground">Defeituosos</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
