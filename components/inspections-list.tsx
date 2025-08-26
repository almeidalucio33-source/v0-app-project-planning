"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Inspection {
  id: string
  type: string
  lastService: string
  available: string
  forecast: string
  daysRemaining: number
  status: "available" | "overdue" | "warning"
}

interface InspectionsListProps {
  inspections: Inspection[]
  onUpdateClick: (inspectionId: string) => void
}

export function InspectionsList({ inspections, onUpdateClick }: InspectionsListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "overdue":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRowColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "bg-red-50 border-red-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      default:
        return "bg-white"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <span>Lista de Inspeções</span>
          <div className="flex gap-2 text-sm">
            <Badge className="bg-orange-100 text-orange-800">FATORES</Badge>
            <Badge className="bg-orange-100 text-orange-800">STATUS</Badge>
            <Badge className="bg-orange-100 text-orange-800">MANUTENÇÃO</Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr className="text-left">
                <th className="p-3 font-medium">Ação</th>
                <th className="p-3 font-medium">Inspeção</th>
                <th className="p-3 font-medium">Tipo</th>
                <th className="p-3 font-medium">Último Serviço</th>
                <th className="p-3 font-medium">Disponível</th>
                <th className="p-3 font-medium">Previsão</th>
                <th className="p-3 font-medium">Dias Restantes</th>
              </tr>
            </thead>

            <tbody>
              {inspections.map((inspection) => (
                <tr key={inspection.id} className={`border-b ${getRowColor(inspection.status)}`}>
                  <td className="p-3">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => onUpdateClick(inspection.id)}
                    >
                      ATUALIZAR
                    </Button>
                  </td>

                  <td className="p-3 font-medium">{inspection.id}</td>

                  <td className="p-3">
                    <Badge className="bg-gray-700 text-white">{inspection.type}</Badge>
                  </td>

                  <td className="p-3">{inspection.lastService}</td>
                  <td className="p-3 font-medium">{inspection.available}</td>
                  <td className="p-3">{inspection.forecast}</td>

                  <td className="p-3">
                    <span className={`font-medium ${inspection.daysRemaining <= 0 ? "text-red-600" : "text-gray-900"}`}>
                      {inspection.daysRemaining} DIAS RESTANTES
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
