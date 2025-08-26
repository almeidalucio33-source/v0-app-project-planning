"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface UpdateModalProps {
  isOpen: boolean
  onClose: () => void
  inspectionId: string | null
}

export function UpdateModal({ isOpen, onClose, inspectionId }: UpdateModalProps) {
  const [serviceDate, setServiceDate] = useState("")
  const [referenceValue, setReferenceValue] = useState("0.0")
  const [unit, setUnit] = useState("FH")

  const handleSave = () => {
    console.log("[v0] Saving inspection update:", {
      inspectionId,
      serviceDate,
      referenceValue,
      unit,
    })

    // Aqui você fará a atualização real dos dados
    alert("Inspeção atualizada com sucesso!")
    onClose()
  }

  const handleUpdateAll = () => {
    console.log("[v0] Updating all selected inspections")
    alert("Todas as inspeções selecionadas foram atualizadas!")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              ATUALIZAR TODAS AS INSPEÇÕES SELECIONADAS ANTERIORMENTE
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">ÚLTIMA MANUTENÇÃO</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="serviceDate" className="text-sm font-medium">
                  Data do serviço:
                </Label>
                <Input
                  id="serviceDate"
                  type="date"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="referenceValue" className="text-sm font-medium">
                    * Valor referente à data da inspeção:
                  </Label>
                  <Input
                    id="referenceValue"
                    type="number"
                    step="0.1"
                    value={referenceValue}
                    onChange={(e) => setReferenceValue(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="w-20">
                  <Label htmlFor="unit" className="text-sm font-medium">
                    Uni.:
                  </Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FH">FH</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="CY">CY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              CANCELAR
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSave}>
              SALVAR
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleUpdateAll}>
              ✓ ATUALIZAR
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
