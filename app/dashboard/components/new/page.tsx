"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Settings, Save } from "lucide-react"
import Link from "next/link"

export default function NewComponentPage() {
  const [formData, setFormData] = useState({
    // Identificação do componente
    partNumber: "",
    controlType: "com-sn", // com-sn, sem-sn, lote
    serialNumber: "",

    // Datas
    manufacturingDate: "",
    installationDate: "",
    validityDate: "",

    // Status e documentação
    itemStatus: "",
    noteNumber: "",
    unitValue: "",

    // Aeronave associada
    aircraftRegistration: "",
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

    console.log("[v0] Component data:", formData)
    setIsLoading(false)

    alert("Componente cadastrado com sucesso!")
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
              <Settings className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Novo Componente</h1>
              <p className="text-sm text-muted-foreground">Cadastro de componente para CTM</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Aviso sobre campos obrigatórios */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              Campos marcados com * são obrigatórios
            </p>
          </div>

          {/* Identificação do Componente */}
          <Card>
            <CardHeader>
              <CardTitle>Identificação do Componente</CardTitle>
              <CardDescription>Informações básicas do componente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aircraftRegistration">Aeronave *</Label>
                  <Select onValueChange={(value) => handleInputChange("aircraftRegistration", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a aeronave" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PT-CSW">PT-CSW - C172</SelectItem>
                      <SelectItem value="PT-GAC">PT-GAC - C172/152-B</SelectItem>
                      <SelectItem value="PR-AES">PR-AES - C152-T92</SelectItem>
                      <SelectItem value="PR-JTG">PR-JTG - PA31-T3A2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partNumber">PN (Part Number) *</Label>
                  <Select onValueChange={(value) => handleInputChange("partNumber", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="ESCOLHA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="152C">152C - Motor</SelectItem>
                      <SelectItem value="O-320-E2D">O-320-E2D - Motor</SelectItem>
                      <SelectItem value="1c172-MTM7653">1c172 MTM7653 - Módulo</SelectItem>
                      <SelectItem value="custom">Outro (especificar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tipo de Controle */}
              <div className="space-y-3">
                <Label>Tipo de controle *</Label>
                <RadioGroup
                  value={formData.controlType}
                  onValueChange={(value) => handleInputChange("controlType", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="com-sn" id="com-sn" />
                    <Label htmlFor="com-sn">Com SN</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sem-sn" id="sem-sn" />
                    <Label htmlFor="sem-sn">Sem SN</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lote" id="lote" />
                    <Label htmlFor="lote">Lote</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Número de Série (condicional) */}
              {formData.controlType === "com-sn" && (
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Número de Série</Label>
                  <Input
                    id="serialNumber"
                    placeholder="Digite o número de série"
                    value={formData.serialNumber}
                    onChange={(e) => handleInputChange("serialNumber", e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Datas e Status */}
          <Card>
            <CardHeader>
              <CardTitle>Datas e Status</CardTitle>
              <CardDescription>Informações de fabricação, instalação e status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manufacturingDate">Data de Fabricação</Label>
                  <Input
                    id="manufacturingDate"
                    type="date"
                    value={formData.manufacturingDate}
                    onChange={(e) => handleInputChange("manufacturingDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installationDate">Data de Instalação</Label>
                  <Input
                    id="installationDate"
                    type="date"
                    value={formData.installationDate}
                    onChange={(e) => handleInputChange("installationDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validityDate">Validade</Label>
                  <Input
                    id="validityDate"
                    type="date"
                    value={formData.validityDate}
                    onChange={(e) => handleInputChange("validityDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="itemStatus">Estado do Item</Label>
                  <Select onValueChange={(value) => handleInputChange("itemStatus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operacional">OPERACIONAL</SelectItem>
                      <SelectItem value="defeituoso">DEFEITUOSO</SelectItem>
                      <SelectItem value="manutencao">EM MANUTENÇÃO</SelectItem>
                      <SelectItem value="removido">REMOVIDO</SelectItem>
                      <SelectItem value="estoque">ESTOQUE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="noteNumber">Número da Nota</Label>
                  <Input
                    id="noteNumber"
                    placeholder="Digite o número da nota"
                    value={formData.noteNumber}
                    onChange={(e) => handleInputChange("noteNumber", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Financeiras */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Financeiras</CardTitle>
              <CardDescription>Valor e custos do componente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="unitValue">Valor Unitário</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">R$</span>
                  <Input
                    id="unitValue"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={formData.unitValue}
                    onChange={(e) => handleInputChange("unitValue", e.target.value)}
                    className="pl-10"
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
                  Salvar Componente
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
