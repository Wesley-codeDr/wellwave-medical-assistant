"use client"

import * as React from "react"
import { useApp } from "@/contexts/app-context"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  BarChart3,
  Settings,
  Users,
  FileText,
  Stethoscope,
  Heart,
  Brain,
  Wind,
  Zap,
  Thermometer,
  User as UserIcon,
  LogOut,
  Plus,
  Search,
  Filter,
  Clock,
  Home,
} from "lucide-react"

export function AppNavigation() {
  const { currentPage, setCurrentPage } = useApp()

  const menuItems = [
    { id: "dashboard", title: "Dashboard", icon: Home, badge: "6", description: "Visão geral do sistema" },
    { id: "anamnese", title: "Anamnese", icon: FileText, badge: "3", description: "Formulário de anamnese PS" },
    { id: "pacientes", title: "Pacientes", icon: Users, badge: "12", description: "Gestão de pacientes" },
    { id: "analytics", title: "Analytics", icon: BarChart3, description: "Relatórios e estatísticas" },
    { id: "configuracoes", title: "Configurações", icon: Settings, description: "Configurações do sistema" },
  ]

  const syndromeItems = [
    { title: "Dor Torácica", icon: Heart, count: 2, color: "text-red-600", bgColor: "bg-red-50" },
    { title: "Cefaleia", icon: Brain, count: 1, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Dispneia", icon: Wind, count: 1, color: "text-green-600", bgColor: "bg-green-50" },
    { title: "Dor Abdominal", icon: Zap, count: 1, color: "text-orange-600", bgColor: "bg-orange-50" },
    { title: "Febre", icon: Thermometer, count: 1, color: "text-purple-600", bgColor: "bg-purple-50" },
  ]

  const quickActions = [
    { title: "Nova Anamnese", icon: Plus, action: () => setCurrentPage("anamnese") },
    { title: "Buscar Paciente", icon: Search, action: () => console.log("Buscar paciente") },
    { title: "Filtros", icon: Filter, action: () => console.log("Filtros") },
  ]

  return (
    <Sidebar className="h-full border-r bg-gradient-to-b from-background to-muted/20">
      <SidebarHeader className="border-b bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold tracking-tight">Anamnese Digital</h2>
            <p className="text-xs text-muted-foreground font-medium">Sistema de Emergência</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={currentPage === item.id} 
                    onClick={() => setCurrentPage(item.id)}
                    className="group relative h-10 rounded-lg transition-all duration-200 hover:bg-accent/50 data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:shadow-sm"
                  >
                    <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span className="truncate font-medium">{item.title}</span>
                    {item.badge && (
                      <SidebarMenuBadge className="ml-auto bg-primary/20 text-primary text-xs font-semibold">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Síndromes Ativas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {syndromeItems.map((s) => (
                <SidebarMenuItem key={s.title}>
                  <SidebarMenuButton className="group justify-start h-9 rounded-lg hover:bg-accent/50 transition-all duration-200">
                    <s.icon className={`h-4 w-4 ${s.color} transition-transform group-hover:scale-110`} />
                    <span className="flex-1 font-medium">{s.title}</span>
                    <SidebarMenuBadge className="bg-secondary/50 text-secondary-foreground text-xs font-semibold">
                      {s.count}
                    </SidebarMenuBadge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ações Rápidas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {quickActions.map((a) => (
                <SidebarMenuItem key={a.title}>
                  <SidebarMenuButton 
                    onClick={a.action} 
                    className="group justify-start h-9 rounded-lg hover:bg-accent/50 transition-all duration-200"
                  >
                    <a.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span className="font-medium">{a.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status do Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3 p-3 rounded-lg bg-muted/30 border">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Sistema Online
                </span>
                <Badge variant="secondary" className="text-xs">Ativo</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Última atualização
                </span>
                <span className="text-xs font-semibold text-primary">2min</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t bg-gradient-to-r from-muted/20 to-background p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
            <UserIcon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Dr. Carlos Silva</p>
            <p className="text-xs text-muted-foreground font-medium">Médico Plantonista</p>
          </div>
          <button 
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm hover:bg-accent transition-colors duration-200"
            title="Sair do sistema"
            aria-label="Sair do sistema"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
