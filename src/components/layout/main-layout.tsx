"use client"

import * as React from "react"
import { useApp } from "@/contexts/app-context"
import { AppNavigation } from "@/components/navigation/app-navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Stethoscope } from "lucide-react"
import { AppHeader } from "@/components/layout/app-header"
import { Toaster } from "@/components/ui/toaster"
// Removed Sheet in favor of SidebarProvider + SidebarTrigger

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { currentPage } = useApp()

  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard":
        return "Dashboard de Anamnese"
      case "anamnese":
        return "Formulário de Anamnese PS"
      case "pacientes":
        return "Gestão de Pacientes"
      case "analytics":
        return "Analytics e Relatórios"
      case "configuracoes":
        return "Configurações do Sistema"
      default:
        return "Sistema de Anamnese Digital"
    }
  }

  const getPageDescription = () => {
    switch (currentPage) {
      case "dashboard":
        return "Visão geral do sistema e estatísticas"
      case "anamnese":
        return "Documentação médica para Pronto-Socorro"
      case "pacientes":
        return "Gestão e histórico de pacientes"
      case "analytics":
        return "Relatórios e análises estatísticas"
      case "configuracoes":
        return "Configurações e preferências do sistema"
      default:
        return "Sistema de Anamnese Digital para Emergência"
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar (desktop e móvel controlado pelo provider) */}
        <AppNavigation />

        {/* Main Content */}
        <div className="flex flex-col flex-1 min-w-0">
          <AppHeader title={getPageTitle()} description={getPageDescription()} />

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-muted/20">
            <div className="container mx-auto px-4 py-6 max-w-7xl">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t bg-card/50 backdrop-blur-sm px-4 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground gap-2">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                <span className="hidden sm:inline">Sistema de Anamnese Digital v1.0 - MVP</span>
                <span className="sm:hidden">Anamnese Digital v1.0</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="hidden md:inline">Desenvolvido para emergência médica</span>
                <Badge variant="outline" className="text-xs">LGPD Compliant</Badge>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}
