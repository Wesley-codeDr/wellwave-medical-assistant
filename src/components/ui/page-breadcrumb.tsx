"use client"

import { useApp } from "@/contexts/app-context"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, FileText, Users, BarChart3, Settings } from "lucide-react"

const pageIcons = {
  dashboard: Home,
  anamnese: FileText,
  pacientes: Users,
  analytics: BarChart3,
  configuracoes: Settings,
}

export function PageBreadcrumb() {
  const { currentPage } = useApp()
  
  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard":
        return "Dashboard"
      case "anamnese":
        return "Anamnese"
      case "pacientes":
        return "Pacientes"
      case "analytics":
        return "Analytics"
      case "configuracoes":
        return "Configurações"
      default:
        return "Dashboard"
    }
  }

  const getPageIcon = () => {
    const Icon = pageIcons[currentPage as keyof typeof pageIcons] || Home
    return <Icon className="h-4 w-4" />
  }

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Início</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center gap-2 font-semibold">
            {getPageIcon()}
            <span>{getPageTitle()}</span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
