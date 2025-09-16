'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Stethoscope,
  Activity,
  Users,
  ClipboardList,
  BarChart3, 
  Settings, 
  Plus,
  Heart,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  User
} from 'lucide-react';
import { KanbanBoard } from './kanban-board';
import { DashboardStats } from './dashboard-stats-improved';
import { NewTaskModal } from './new-task-modal';
import { AppSidebar } from './app-sidebar';
import { getInitialColumns, Column, Task } from '@/lib/mock-data';

export function Dashboard() {
  const [columns, setColumns] = useState<Column[]>(getInitialColumns());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    console.log('Task clicked:', task);
  };

  const handleCreateTask = (newTask: any) => {
    setColumns(prevColumns => 
      prevColumns.map(col => 
        col.id === 'entrada' 
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );
  };

  const medicalMetrics = [
    {
      title: "Pacientes Ativos",
      value: "247",
      change: "+12%",
      icon: Users,
      trend: "up",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Pacientes em acompanhamento"
    },
    {
      title: "Anamneses Hoje",
      value: "18",
      change: "+8%",
      icon: ClipboardList,
      trend: "up",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Realizadas nas últimas 24h"
    },
    {
      title: "Casos Críticos",
      value: "3",
      change: "-2",
      icon: AlertTriangle,
      trend: "down",
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Necessitam atenção imediata"
    },
    {
      title: "Taxa de Resolução",
      value: "94.2%",
      change: "+2.1%",
      icon: CheckCircle,
      trend: "up",
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Casos resolvidos este mês"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      <div className="space-y-8 p-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        
        {/* Header Médico */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                  Central Médica
                </h1>
                <p className="text-slate-600 mt-1">
                  Painel de controle para gestão clínica avançada
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="px-3 py-1 text-sm font-medium border-blue-200 text-blue-700">
                <Activity className="h-4 w-4 mr-2" />
                Sistema Ativo
              </Badge>
              <NewTaskModal onTaskCreate={handleCreateTask}>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 px-6">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Anamnese
                </Button>
              </NewTaskModal>
            </div>
          </div>

          {/* Métricas Médicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicalMetrics.map((metric, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-0 shadow-md hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${metric.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <metric.icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                    <Badge 
                      variant={metric.trend === 'up' ? 'default' : 'destructive'} 
                      className="text-xs font-medium"
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900">{metric.value}</h3>
                    <p className="text-sm font-medium text-slate-700">{metric.title}</p>
                    <p className="text-xs text-slate-500">{metric.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs Principais */}
        <Tabs defaultValue="kanban" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-14 bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
            <TabsTrigger 
              value="kanban" 
              className="flex items-center gap-3 text-sm font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 transition-all duration-300"
            >
              <ClipboardList className="h-5 w-5" />
              <span className="hidden sm:inline">Gestão de Casos</span>
              <span className="sm:hidden">Casos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex items-center gap-3 text-sm font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 transition-all duration-300"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="hidden sm:inline">Analytics Médicos</span>
              <span className="sm:hidden">Analytics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex items-center gap-3 text-sm font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 transition-all duration-300"
            >
              <Settings className="h-5 w-5" />
              <span className="hidden sm:inline">Configurações</span>
              <span className="sm:hidden">Config</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="space-y-6">
            {/* Estatísticas Rápidas */}
            <DashboardStats columns={columns} />
            
            {/* Board Kanban Médico */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-green-50/30 pointer-events-none" />
              <CardHeader className="pb-6 relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                      <ClipboardList className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <span>Fluxo de Atendimento</span>
                      <p className="text-sm font-normal text-slate-600 mt-1">
                        Gestão visual de pacientes e procedimentos
                      </p>
                    </div>
                  </CardTitle>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50/80">
                      <User className="h-3 w-3 mr-1" />
                      {columns.reduce((sum, col) => sum + col.tasks.length, 0)} pacientes
                    </Badge>
                    <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50/80">
                      <Clock className="h-3 w-3 mr-1" />
                      Tempo real
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <KanbanBoard 
                  onTaskClick={handleTaskClick}
                  onCreateTask={() => {}}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <BarChart3 className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  Analytics e Relatórios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <div className="p-4 rounded-full bg-muted/30 w-fit mx-auto mb-4">
                    <BarChart3 className="h-12 w-12 opacity-50" />
                  </div>
                  <p className="text-lg font-medium mb-2">Analytics em desenvolvimento</p>
                  <p className="text-sm">Esta seção será implementada na Fase 3 do projeto</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Settings className="h-5 w-5 text-accent-foreground" />
                  </div>
                  Configurações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <div className="p-4 rounded-full bg-muted/30 w-fit mx-auto mb-4">
                    <Settings className="h-12 w-12 opacity-50" />
                  </div>
                  <p className="text-lg font-medium mb-2">Configurações em desenvolvimento</p>
                  <p className="text-sm">Painel administrativo será implementado na Fase 2</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
    </div>
  );
}
