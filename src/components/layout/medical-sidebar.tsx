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
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { MedicalButton } from '@/components/ui/medical-button';
import { Separator } from '@/components/ui/separator';
import { BreadcrumbNav } from '@/components/navigation/breadcrumb-nav';
import { GlobalSearch } from '@/components/navigation/global-search';
import {
  Stethoscope,
  FileText,
  Users,
  BarChart3,
  Settings,
  Heart,
  Brain,
  Wind,
  Thermometer,
  Activity,
  Bell,
  User,
  LogOut,
  Plus,
  Search,
  Shield,
  HelpCircle,
  CreditCard
} from 'lucide-react';

interface MedicalSidebarProps {
  children: React.ReactNode;
}

export function MedicalSidebar({ children }: MedicalSidebarProps) {
  const { currentPage, setCurrentPage } = useApp();

  const menuItems = [
    {
      title: 'Central Médica',
      url: '/dashboard',
      icon: Stethoscope,
      badge: '6',
      isActive: currentPage === 'dashboard',
      description: 'Painel de controle principal'
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
      title: 'Pacientes',
      url: '/pacientes',
      icon: Users,
      badge: '12',
      isActive: currentPage === 'pacientes',
      description: 'Gestão de pacientes'
    },
    {
      title: 'Analytics Médicos',
      url: '/analytics',
      icon: BarChart3,
      badge: '',
      isActive: currentPage === 'analytics',
      description: 'Relatórios e estatísticas'
    },
    {
      title: 'Pagamentos PIX',
      url: '/payment',
      icon: CreditCard,
      badge: 'NEW',
      isActive: currentPage === 'payment',
      description: 'Pagamentos e cobrança'
    },
    {
      title: 'Análise de Dados',
      url: '/data-analysis',
      icon: BarChart3,
      badge: 'HOT',
      isActive: currentPage === 'data-analysis',
      description: 'Processamento de dados'
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
      priority: 'alta',
      color: 'text-red-600'
    },
    {
      title: 'Cefaleia',
      icon: Brain,
      count: 5,
      priority: 'media',
      color: 'text-orange-600'
    },
    {
      title: 'Dispneia',
      icon: Wind,
      count: 3,
      priority: 'alta',
      color: 'text-red-600'
    },
    {
      title: 'Febre',
      icon: Thermometer,
      count: 4,
      priority: 'media',
      color: 'text-yellow-600'
    },
    {
      title: 'Síncope',
      icon: Activity,
      count: 1,
      priority: 'baixa',
      color: 'text-green-600'
    }
  ];

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-slate-200 bg-gradient-to-b from-white to-slate-50/50">
          <SidebarHeader className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">WellWave</h2>
                <p className="text-xs text-slate-600">Sistema Médico</p>
              </div>
            </div>
            <div className="px-4 pb-3">
              <GlobalSearch />
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            {/* Menu Principal */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Navegação Principal
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        onClick={() => setCurrentPage(item.url.replace('/', ''))}
                        className={`group w-full rounded-xl transition-all duration-300 ${
                          item.isActive
                            ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                            : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3 p-3 w-full">
                          <div className={`p-2 rounded-lg transition-colors duration-300 ${
                            item.isActive 
                              ? 'bg-blue-500/10' 
                              : 'bg-slate-100 group-hover:bg-slate-200'
                          }`}>
                            <item.icon className={`h-5 w-5 ${
                              item.isActive ? 'text-blue-600' : 'text-slate-600'
                            }`} />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{item.title}</span>
                              {item.badge && (
                                <Badge 
                                  variant={item.isActive ? "default" : "secondary"}
                                  className="text-xs h-5 px-2"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator className="my-6" />

            {/* Síndromes Ativas */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Síndromes Ativas
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="space-y-2">
                  {syndromeItems.map((syndrome, index) => (
                    <div 
                      key={index}
                      className="group p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors duration-300">
                            <syndrome.icon className={`h-4 w-4 ${syndrome.color}`} />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-slate-900">
                              {syndrome.title}
                            </span>
                            <p className="text-xs text-slate-500 capitalize">
                              Prioridade {syndrome.priority}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline"
                          className="text-xs h-6 px-2"
                        >
                          {syndrome.count}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200 bg-white/80 backdrop-blur-sm p-4">
            <div className="space-y-3">
              <MedicalButton
                variant="outline"
                size="sm"
                icon={Plus}
                className="w-full"
              >
                Nova Anamnese
              </MedicalButton>
              
              <div className="flex items-center gap-2">
                <MedicalButton
                  variant="secondary"
                  size="sm"
                  icon={Bell}
                  className="flex-1"
                >
                  <span className="hidden sm:inline">Alertas</span>
                </MedicalButton>
                <MedicalButton
                  variant="secondary"
                  size="sm"
                  icon={HelpCircle}
                  className="flex-1"
                >
                  <span className="hidden sm:inline">Ajuda</span>
                </MedicalButton>
              </div>

              <Separator />

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-300">
                <div className="p-2 rounded-lg bg-blue-500 text-white">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Dr. Médico</p>
                  <p className="text-xs text-slate-500">CRM 123456</p>
                </div>
                <MedicalButton
                  variant="secondary"
                  size="sm"
                  icon={LogOut}
                  className="px-2"
                >
                  Sair
                </MedicalButton>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm">
            <div className="flex items-center gap-4 px-6 py-3">
              <SidebarTrigger className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200" />
              <BreadcrumbNav />
              <div className="ml-auto flex items-center gap-3">
                <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                  <Activity className="h-3 w-3 mr-1" />
                  Sistema Online
                </Badge>
                <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
                  <Shield className="h-3 w-3 mr-1" />
                  LGPD Compliant
                </Badge>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
