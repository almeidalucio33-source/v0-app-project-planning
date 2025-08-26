"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronRight, Plus, Filter, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Estrutura hierárquica dos mapas de inspeção
const inspectionMaps = [
  {
    id: "maps-inspections",
    title: "MAPAS DE INSPEÇÕES E COMPONENTES",
    subtitle: "54/05/2024",
    type: "category",
    expanded: true,
    children: [
      { id: "cap", title: "CAP", type: "item" },
      { id: "components", title: "COMPONENTES", type: "item" },
      /* Added propeller components */
      { id: "propeller-components", title: "COMPONENTES DA HÉLICE", type: "item" },
      { id: "special-inspections", title: "INSPEÇÕES ESPECIAIS", type: "item" },
      { id: "operations", title: "OPERAÇÕES", type: "item" },
      { id: "sid", title: "SID", type: "item" },
    ],
  },
  {
    id: "cell-map",
    title: "MAPA DE CÉLULA",
    subtitle: "ACI, SAAB, ADS",
    type: "category",
    expanded: false,
    children: [
      { id: "cell-ads-brasil", title: "CÉLULA - ADs (BRASIL)", type: "item" },
      { id: "cell-ads-eua", title: "CÉLULA - ADs (E.U.A)", type: "item" },
    ],
  },
  /* Added propeller map section */
  {
    id: "propeller-map",
    title: "MAPA DE HÉLICE",
    subtitle: "MCCAULEY, HARTZELL",
    type: "category",
    expanded: false,
    children: [
      { id: "propeller-ads-brasil", title: "HÉLICE - ADs (BRASIL)", type: "item" },
      { id: "propeller-ads-eua", title: "HÉLICE - ADs (E.U.A)", type: "item" },
    ],
  },
]

export default function InspectionMapsPage() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["maps-inspections"])
  const [filters, setFilters] = useState({
    type: "",
    manufacturer: "",
    model: "",
    aircraft: "",
  })

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const renderTreeItem = (item: any, level = 0) => {
    const isExpanded = expandedItems.includes(item.id)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id} className="w-full">
        <div
          className={`flex items-center justify-between p-3 border-b border-border hover:bg-muted/50 transition-colors ${
            level > 0 ? "ml-6" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            {hasChildren && (
              <button onClick={() => toggleExpanded(item.id)} className="p-1 hover:bg-muted rounded">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            )}
            {!hasChildren && <div className="w-6" />}

            <div>
              <h3 className="font-medium text-foreground">{item.title}</h3>
              {item.subtitle && <p className="text-sm text-muted-foreground font-medium">{item.subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              ADICIONAR CATEGORIA
            </Button>
            <Link href="/dashboard/inspection-maps/new">
              <Button size="sm">NOVA INSPEÇÃO</Button>
            </Link>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="bg-muted/20">{item.children.map((child: any) => renderTreeItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Mapas de Inspeção</h1>
              <p className="text-sm text-muted-foreground font-medium">Gerenciamento de inspeções por capítulos</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">Tipo</label>
                <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="ESCOLHA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celula">CÉLULA</SelectItem>
                    <SelectItem value="motor">MOTOR</SelectItem>
                    <SelectItem value="helice">HÉLICE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">Fabricante</label>
                <Select
                  value={filters.manufacturer}
                  onValueChange={(value) => setFilters({ ...filters, manufacturer: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="ESCOLHA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cessna">CESSNA</SelectItem>
                    <SelectItem value="piper">PIPER</SelectItem>
                    <SelectItem value="embraer">EMBRAER</SelectItem>
                    <SelectItem value="mccauley">MCCAULEY</SelectItem>
                    <SelectItem value="hartzell">HARTZELL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">Modelo</label>
                <Select value={filters.model} onValueChange={(value) => setFilters({ ...filters, model: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="ESCOLHA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c152">C152</SelectItem>
                    <SelectItem value="c172">C172</SelectItem>
                    <SelectItem value="pa31">PA31</SelectItem>
                    <SelectItem value="1a103tcm6958">1A103/TCM6958</SelectItem>
                    <SelectItem value="1l0334">1L-0334</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">Aeronave</label>
                <Select value={filters.aircraft} onValueChange={(value) => setFilters({ ...filters, aircraft: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="TODOS OS MODELOS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-csw">PT-CSW</SelectItem>
                    <SelectItem value="pt-gac">PT-GAC</SelectItem>
                    <SelectItem value="pr-aes">PR-AES</SelectItem>
                    <SelectItem value="pr-jtg">PR-JTG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button>CARREGAR MODELO</Button>
            </div>
          </CardContent>
        </Card>

        {/* Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
            <p className="text-sm text-blue-900 font-medium">
              Você está alterando todos os modelos. <strong>CTRL</strong>
            </p>
          </div>
        </div>

        {/* Tree Structure */}
        <Card>
          <CardContent className="p-0">{inspectionMaps.map((item) => renderTreeItem(item))}</CardContent>
        </Card>
      </div>
    </div>
  )
}
