"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Plane,
  Settings,
  User,
  Home,
  ClipboardList,
  Package,
  History,
  RefreshCw,
  Heart,
  Sun,
  Moon,
  FileText,
  Clock,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const isMainDashboard = pathname === "/dashboard"

  const calculateHealthStatus = () => {
    // Simplified health calculation for layout
    return { status: "Saudável", color: "text-green-600" }
  }

  const healthStatus = calculateHealthStatus()

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header - Only show on non-main pages */}
      {!isMainDashboard && (
        <div className="md:hidden bg-sidebar border-b border-sidebar-border p-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-sidebar-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-sidebar-foreground" />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-4 w-4 text-sidebar-foreground" />
          </div>
        </div>
      )}

      {/* Sidebar - Always visible on desktop, collapsible on mobile */}
      <aside
        className={`w-full md:w-80 bg-sidebar border-r border-sidebar-border p-4 md:p-6 ${!isMainDashboard ? "hidden md:block" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="bg-primary rounded-full p-2">
            <Plane className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-sidebar-foreground">AeroManager</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Sun className="h-4 w-4 text-sidebar-foreground" />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-4 w-4 text-sidebar-foreground" />
          </div>
        </div>

        {/* User Profile */}
        <div className="bg-sidebar-accent rounded-lg p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full p-2">
              <User className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm md:text-base text-sidebar-foreground">Bruno Fernando</p>
              <p className="text-xs md:text-sm text-sidebar-foreground/70">Técnico de Manutenção</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 md:space-y-2">
          <Link href="/dashboard" className={`nav-item ${pathname === "/dashboard" ? "active" : ""}`}>
            <Home className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Dashboard</span>
          </Link>
          <Link
            href="/dashboard/aircraft"
            className={`nav-item ${pathname.startsWith("/dashboard/aircraft") ? "active" : ""}`}
          >
            <Plane className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Aeronaves</span>
          </Link>
          <Link
            href="/dashboard/inspection-maps"
            className={`nav-item ${pathname.startsWith("/dashboard/inspection-maps") ? "active" : ""}`}
          >
            <ClipboardList className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Inspeções</span>
          </Link>
          <Link
            href="/dashboard/upcoming-inspections"
            className={`nav-item ${pathname.startsWith("/dashboard/upcoming-inspections") ? "active" : ""}`}
          >
            <Clock className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Próximas Inspeções</span>
          </Link>
          <Link
            href="/dashboard/components"
            className={`nav-item ${pathname.startsWith("/dashboard/components") ? "active" : ""}`}
          >
            <Package className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Componentes</span>
          </Link>
          <Link
            href="/dashboard/documents"
            className={`nav-item ${pathname.startsWith("/dashboard/documents") ? "active" : ""}`}
          >
            <FileText className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Documentos</span>
          </Link>
          <Link
            href="/dashboard/history"
            className={`nav-item ${pathname.startsWith("/dashboard/history") ? "active" : ""}`}
          >
            <History className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Histórico</span>
          </Link>
          <Link
            href="/dashboard/health"
            className={`nav-item ${pathname.startsWith("/dashboard/health") ? "active" : ""}`}
          >
            <Heart className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Saúde</span>
            <Badge variant="secondary" className={`ml-auto text-xs ${healthStatus.color}`}>
              {healthStatus.status}
            </Badge>
          </Link>
          <Link href="/dashboard/sync" className={`nav-item ${pathname.startsWith("/dashboard/sync") ? "active" : ""}`}>
            <RefreshCw className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Sincronizar</span>
          </Link>
        </nav>

        {/* Settings Button - Only on main dashboard */}
        {isMainDashboard && (
          <div className="mt-6 pt-4 border-t border-sidebar-border">
            <Link href="/dashboard/settings">
              <Button
                variant="outline"
                className="w-full justify-start text-sidebar-foreground border-sidebar-border bg-transparent"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </Link>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">{children}</main>
    </div>
  )
}
