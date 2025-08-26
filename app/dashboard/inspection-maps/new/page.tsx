"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

export default function NewInspectionPage() {
  const [inspectionType, setInspectionType] = useState("celula")
  const [components, setComponents] = useState([{ mpn: "", pn: "" }])
  const [frequencies, setFrequencies] = useState([{ limit: "", margin: "", unit: "" }])

  const addComponent = () => {
    setComponents([...components, { mpn: "", pn: "" }])
  }

  const removeComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index))
  }

  const addFrequency = () => {
    setFrequencies([...frequencies, { limit: "", margin: "", unit: "" }])
  }

  const removeFrequency = (index: number) => {
    setFrequencies(frequencies.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/inspection-maps">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Nova Inspeção</h1>
              <p className="text-sm text-muted-foreground font-medium">Cadastro de nova inspeção no mapa</p>
            </div>
          </div>
          <Button variant="destructive">DESQUALIFICAR INSPEÇÃO</Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <form className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Informações da Inspeção</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-foreground font-medium">
                    Category *
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="MAPA DE COMPONENTES" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mapa-componentes">MAPA DE COMPONENTES</SelectItem>
                      <SelectItem value="mapa-celula">MAPA DE CÉLULA</SelectItem>
                      <SelectItem value="mapa-helice">MAPA DE HÉLICE</SelectItem>
                      <SelectItem value="diretrizes">DIRETRIZES DE AERONAVEGABILIDADES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="chapter" className="text-foreground font-medium">
                    Chapter *
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="COMPONENTES DO MOTOR LH" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motor-lh">COMPONENTES DO MOTOR LH</SelectItem>
                      <SelectItem value="motor-rh">COMPONENTES DO MOTOR RH</SelectItem>
                      <SelectItem value="celula">CÉLULA</SelectItem>
                      <SelectItem value="helice">COMPONENTES DA HÉLICE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="maintenance-mode" className="text-foreground font-medium">
                    Maintenance Mode *
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="ESCOLHA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preventiva">PREVENTIVA</SelectItem>
                      <SelectItem value="corretiva">CORRETIVA</SelectItem>
                      <SelectItem value="preditiva">PREDITIVA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="interval" className="text-foreground font-medium">
                    Interval
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="ESCOLHA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100h">100H</SelectItem>
                      <SelectItem value="500h">500H</SelectItem>
                      <SelectItem value="1000h">1000H</SelectItem>
                      <SelectItem value="annual">ANUAL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="man-hour" className="text-foreground font-medium">
                    Man/Hour
                  </Label>
                  <Input id="man-hour" placeholder="0.0" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="task-number" className="text-foreground font-medium">
                    Task Number
                  </Label>
                  <Input id="task-number" />
                </div>

                <div>
                  <Label htmlFor="reference-manual" className="text-foreground font-medium">
                    Reference Manual
                  </Label>
                  <Input id="reference-manual" />
                </div>
              </div>

              <div>
                <Label htmlFor="task-title" className="text-foreground font-medium">
                  Task Title
                </Label>
                <Textarea id="task-title" rows={3} />
              </div>

              <div>
                <Label htmlFor="documentation" className="text-foreground font-medium">
                  Documentation
                </Label>
                <Textarea id="documentation" rows={2} />
              </div>

              <div>
                <Label htmlFor="description" className="text-foreground font-medium">
                  Description
                </Label>
                <Textarea id="description" rows={4} />
              </div>
            </CardContent>
          </Card>

          {/* Componentes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Componentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {components.map((component, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <Label htmlFor={`mpn-${index}`} className="text-foreground font-medium">
                      MPN
                    </Label>
                    <Input
                      id={`mpn-${index}`}
                      value={component.mpn}
                      onChange={(e) => {
                        const newComponents = [...components]
                        newComponents[index].mpn = e.target.value
                        setComponents(newComponents)
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`pn-${index}`} className="text-foreground font-medium">
                      PN
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="ESCOLHA" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fh">FH</SelectItem>
                        <SelectItem value="d">D</SelectItem>
                        <SelectItem value="m">M</SelectItem>
                        <SelectItem value="sc">SC</SelectItem>
                        <SelectItem value="tc">TC</SelectItem>
                        <SelectItem value="p">P</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" size="sm" onClick={addComponent}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                    {components.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeComponent(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <div className="text-sm text-muted-foreground font-medium">
                <p>Adicionar Manufacturer PN's:</p>
                <p>Nenhum MPN foi adicionado.</p>
                <p>Adicionar PN's:</p>
                <p>Nenhum PN foi adicionado.</p>
              </div>
            </CardContent>
          </Card>

          {/* Frequências */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Frequências</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {frequencies.map((frequency, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <Label htmlFor={`limit-${index}`} className="text-foreground font-medium">
                      Limit
                    </Label>
                    <Input
                      id={`limit-${index}`}
                      value={frequency.limit}
                      onChange={(e) => {
                        const newFrequencies = [...frequencies]
                        newFrequencies[index].limit = e.target.value
                        setFrequencies(newFrequencies)
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`margin-${index}`} className="text-foreground font-medium">
                      Margin
                    </Label>
                    <Input
                      id={`margin-${index}`}
                      value={frequency.margin}
                      onChange={(e) => {
                        const newFrequencies = [...frequencies]
                        newFrequencies[index].margin = e.target.value
                        setFrequencies(newFrequencies)
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`unit-${index}`} className="text-foreground font-medium">
                      Unit
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="ESCOLHA" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fh">FH</SelectItem>
                        <SelectItem value="fc">FC</SelectItem>
                        <SelectItem value="days">DIAS</SelectItem>
                        <SelectItem value="months">MESES</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    {index === frequencies.length - 1 && (
                      <Button type="button" size="sm" onClick={addFrequency}>
                        ADICIONAR FREQUÊNCIA
                      </Button>
                    )}
                    {frequencies.length > 1 && (
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeFrequency(index)}>
                        EXCLUIR
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link href="/dashboard/inspection-maps">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              SALVAR
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
