'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/app-context';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { BreadcrumbNav } from '@/components/navigation/breadcrumb-nav';
import { GlobalSearch } from '@/components/navigation/global-search';
import {
  Kanban,
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
  Bell,
  User,
  LogOut,
  Plus,
  Search,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle,
  Activity
} from 'lucide-react';

interface AppSidebarProps {
  children: React.ReactNode;
}

export function AppSidebar({ children }: AppSidebarProps) {
  const { currentPage, setCurrentPage } = useApp();

  const menuItems = [
    {
      title: 'Central Médica',
      url: '/dashboard',
      icon: Stethoscope,
      badge: '6',
      isActive: currentPage === 'dashboard',
      description: 'Painel de controle'
    },
    {
      title: 'Anamnese Digital',
      url: '/anamnese',
      icon: FileText,
      badge: '3',
      isActive: currentPage === 'anamnese',
      description: 'Coleta de dados clínicos'
    },
    {
      title: 'Gestão de Pacientes',
      url: '/pacientes',
      icon: Users,
      badge: '12',
      isActive: currentPage === 'pacientes',
      description: 'Cadastro e acompanhamento'
    },
    {
      title: 'Analytics Clínicos',
      url: '/analytics',
      icon: BarChart3,
      isActive: currentPage === 'analytics',
      description: 'Relatórios e insights'
    },
    {
      title: 'Configurações',
      url: '/configuracoes',
      icon: Settings,
      isActive: currentPage === 'configuracoes',
      description: 'Preferências do sistema'
    }
  ];

  const syndromeItems = [
    {
      title: 'Dor Torácica',
      icon: Heart,
      count: 2,
      color: 'text-red-600'
    },
    {
      title: 'Cefaleia',
      icon: Brain,
      count: 1,
      color: 'text-blue-600'
    },
    {
      title: 'Dispneia',
      icon: Wind,
      count: 1,
      color: 'text-green-600'
    },
    {
      title: 'Dor Abdominal',
      icon: Zap,
      count: 1,
      color: 'text-orange-600'
    },
    {
      title: 'Febre',
      icon: Thermometer,
      count: 1,
      color: 'text-purple-600'
    }
  ];

  const quickActions = [
    {
      title: 'Nova Anamnese',
      icon: Plus,
      action: () => console.log('Nova anamnese')
    },
    {
      title: 'Buscar Paciente',
      icon: Search,
      action: () => console.log('Buscar paciente')
    },
    {
      title: 'Filtros',
      icon: Filter,
      action: () => console.log('Filtros')
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="sidebar-modern border-r animate-in fade-in-0 slide-in-from-left-4">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Stethoscope className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Anamnese Digital</h2>
                <p className="text-xs text-muted-foreground">Sistema de Emergência</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            {/* Menu Principal */}
            <SidebarGroup>
              <SidebarGroupLabel>Navegação</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => {
                          const pageMap: Record<string, string> = {
                            'Dashboard': 'dashboard',
                            'Anamnese': 'anamnese',
                            'Pacientes': 'pacientes',
                            'Analytics': 'analytics',
                            'Configurações': 'configuracoes'
                          };
                          setCurrentPage(pageMap[item.title] || 'dashboard');
                        }}
                        className={`w-full justify-start ${
                          item.isActive ? 'bg-accent text-accent-foreground' : ''
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator className="my-4" />

            {/* Síndromes Ativas */}
            <SidebarGroup>
              <SidebarGroupLabel>Síndromes Ativas</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {syndromeItems.map((syndrome) => (
                    <SidebarMenuItem key={syndrome.title}>
                      <SidebarMenuButton className="w-full justify-start">
                        <syndrome.icon className={`h-4 w-4 ${syndrome.color}`} />
                        <span className="flex-1">{syndrome.title}</span>
                        <Badge variant="outline" className="ml-auto">
                          {syndrome.count}
                        </Badge>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator className="my-4" />

            {/* Ações Rápidas */}
            <SidebarGroup>
              <SidebarGroupLabel>Ações Rápidas</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="space-y-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.title}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={action.action}
                    >
                      <action.icon className="h-4 w-4 mr-2" />
                      {action.title}
                    </Button>
                  ))}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator className="my-4" />

            {/* Status do Sistema */}
            <SidebarGroup>
              <SidebarGroupLabel>Status do Sistema</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      Sistema Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      Última atualização
                    </span>
                    <span className="text-xs text-muted-foreground">2min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      Médicos online
                    </span>
                    <Badge variant="outline" className="text-xs">
                      3
                    </Badge>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Dr. Carlos Silva</p>
                <p className="text-xs text-muted-foreground">Médico Plantonista</p>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1">
          <header className="border-b bg-background px-4 py-3 animate-in fade-in-0 slide-in-from-top-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="space-y-1">
                  <BreadcrumbNav />
                  <h1 className="text-xl font-semibold">Dashboard de Anamnese</h1>
                  <p className="text-sm text-muted-foreground">
                    Sistema de Anamnese Digital para Emergência
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden sm:block">
                  <GlobalSearch />
                </div>
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Bell className="h-4 w-4" />
                </Button>
                <ThemeToggle />
                <Button className="hidden md:flex">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Tarefa
                </Button>
                <Button size="sm" className="md:hidden">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
