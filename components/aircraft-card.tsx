"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane } from "lucide-react"

interface AircraftCardProps {
  aircraft: {
    id: string
    model: string
    status: string
    nextInspection: string
    daysRemaining: number
    lastService: string
  }
  isSelected: boolean
  onClick: () => void
}

export function AircraftCard({ aircraft, isSelected, onClick }: AircraftCardProps) {
  const getStatusColor = (status: string, daysRemaining: number) => {
    if (daysRemaining <= 0) return "bg-red-500"
    if (daysRemaining <= 30) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStatusText = (daysRemaining: number) => {
    if (daysRemaining <= 0) return "VENCIDO"
    if (daysRemaining <= 30) return "ATENÇÃO"
    return "DISPONÍVEL"
  }

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? "ring-2 ring-primary" : ""}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">{aircraft.id}</h3>
              <p className="text-sm text-muted-foreground">{aircraft.model}</p>
            </div>
          </div>

          <Badge className={`${getStatusColor(aircraft.status, aircraft.daysRemaining)} text-white`}>
            {getStatusText(aircraft.daysRemaining)}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Inspeção:</span>
            <span className="font-medium">{aircraft.nextInspection}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Previsão:</span>
            <span className="font-medium">{aircraft.lastService}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Dias restantes:</span>
            <span
              className={`font-medium ${
                aircraft.daysRemaining <= 0
                  ? "text-red-500"
                  : aircraft.daysRemaining <= 30
                    ? "text-yellow-600"
                    : "text-green-600"
              }`}
            >
              {aircraft.daysRemaining} dias
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
