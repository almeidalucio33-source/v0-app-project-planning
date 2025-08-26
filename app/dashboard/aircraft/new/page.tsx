"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plane, Save } from "lucide-react"
import Link from "next/link"

export default function NewAircraftPage() {
  const [formData, setFormData] = useState({
    // Dados básicos da aeronave
    registration: "",
    model: "",
    manufacturer: "",
    serialNumber: "",
    aircraftType: "",

    // Informações operacionais
    manufacturingDate: "",
    cellHours: "",
    engineHours: "",
    maxPassengers: "",

    // Parâmetros de ciclo
    hourCycle: "",
    torqueCycle: "",
    slingCycle: "",

    // Informações adicionais
    fuelCapacity: "",
    maxWeight: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Aircraft data:", formData)
    setIsLoading(false)

    // Aqui você redirecionaria para o dashboard
    alert("Aeronave cadastrada com sucesso!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full p-2">
              <Plane className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Nova Aeronave</h1>
              <p className="text-sm text-muted-foreground">Cadastro de aeronave para CTM</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados da Aeronave */}
          <Card>
            <CardHeader>
              <CardTitle>Dados da Aeronave</CardTitle>
              <CardDescription>Informações básicas de identificação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="registration">Matrícula *</Label>
                  <Input
                    id="registration"
                    placeholder="PT-ABC"
                    value={formData.registration}
                    onChange={(e) => handleInputChange("registration", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Modelo *</Label>
                  <Input
                    id="model"
                    placeholder="C172"
                    value={formData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Fabricante *</Label>
                  <Select onValueChange={(value) => handleInputChange("manufacturer", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o fabricante" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cessna">Cessna</SelectItem>
                      <SelectItem value="piper">Piper</SelectItem>
                      <SelectItem value="beechcraft">Beechcraft</SelectItem>
                      <SelectItem value="embraer">Embraer</SelectItem>
                      <SelectItem value="cirrus">Cirrus</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Número de Série</Label>
                  <Input
                    id="serialNumber"
                    placeholder="17280001"
                    value={formData.serialNumber}
                    onChange={(e) => handleInputChange("serialNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aircraftType">Tipo de Aeronave</Label>
                  <Select onValueChange={(value) => handleInputChange("aircraftType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monomotor">Monomotor</SelectItem>
                      <SelectItem value="bimotor">Bimotor</SelectItem>
                      <SelectItem value="turbohelice">Turboélice</SelectItem>
                      <SelectItem value="jato">Jato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manufacturingDate">Data de Fabricação</Label>
                  <Input
                    id="manufacturingDate"
                    type="date"
                    value={formData.manufacturingDate}
                    onChange={(e) => handleInputChange("manufacturingDate", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Operacionais */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Operacionais</CardTitle>
              <CardDescription>Dados de horas e capacidades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cellHours">Horas Célula (TSN)</Label>
                  <Input
                    id="cellHours"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.cellHours}
                    onChange={(e) => handleInputChange("cellHours", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="engineHours">Horas Motor (TSN)</Label>
                  <Input
                    id="engineHours"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.engineHours}
                    onChange={(e) => handleInputChange("engineHours", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPassengers">Máx. Passageiros</Label>
                  <Input
                    id="maxPassengers"
                    type="number"
                    placeholder="4"
                    value={formData.maxPassengers}
                    onChange={(e) => handleInputChange("maxPassengers", e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fuelCapacity">Capacidade Combustível (L)</Label>
                  <Input
                    id="fuelCapacity"
                    type="number"
                    placeholder="200"
                    value={formData.fuelCapacity}
                    onChange={(e) => handleInputChange("fuelCapacity", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxWeight">Peso Máximo (kg)</Label>
                  <Input
                    id="maxWeight"
                    type="number"
                    placeholder="1157"
                    value={formData.maxWeight}
                    onChange={(e) => handleInputChange("maxWeight", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parâmetros de Ciclo */}
          <Card>
            <CardHeader>
              <CardTitle>Parâmetros da Aeronave</CardTitle>
              <CardDescription>Configurações para cálculo de ciclos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hourCycle">Hora Cycle (1 - X)</Label>
                  <Input
                    id="hourCycle"
                    type="number"
                    step="0.1"
                    placeholder="1.0"
                    value={formData.hourCycle}
                    onChange={(e) => handleInputChange("hourCycle", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="torqueCycle">Torque Cycle (1 - X)</Label>
                  <Input
                    id="torqueCycle"
                    type="number"
                    step="0.1"
                    placeholder="1.0"
                    value={formData.torqueCycle}
                    onChange={(e) => handleInputChange("torqueCycle", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slingCycle">Sling Cycle (1 - X)</Label>
                  <Input
                    id="slingCycle"
                    type="number"
                    step="0.1"
                    placeholder="1.0"
                    value={formData.slingCycle}
                    onChange={(e) => handleInputChange("slingCycle", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4">
            <Link href="/dashboard">
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>Salvando...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Aeronave
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
