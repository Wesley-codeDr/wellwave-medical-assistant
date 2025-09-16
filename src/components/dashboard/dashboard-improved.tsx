'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MedicalCard, MedicalMetricCard } from '@/components/ui/medical-card';
import { MedicalButton } from '@/components/ui/medical-button';
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
      color: "blue",
      description: "Pacientes em acompanhamento"
    },
    {
      title: "Anamneses Hoje",
      value: "18",
      change: "+8%",
      icon: ClipboardList,
      trend: "up",
      color: "green",
      description: "Realizadas nas últimas 24h"
    },
    {
      title: "Casos Críticos",
      value: "3",
      change: "-2",
      icon: AlertTriangle,
      trend: "down",
      color: "red",
      description: "Necessitam atenção imediata"
    },
    {
      title: "Taxa de Resolução",
      value: "94.2%",
      change: "+2.1%",
      icon: CheckCircle,
      trend: "up",
      color: "green",
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
                <MedicalButton icon={Plus} variant="primary">
                  Nova Anamnese
                </MedicalButton>
              </NewTaskModal>
            </div>
          </div>

          {/* Métricas Médicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicalMetrics.map((metric, index) => (
              <MedicalMetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                subtitle={metric.description}
                icon={metric.icon}
                color={metric.color as any}
                trend={{
                  value: metric.change,
                  isPositive: metric.trend === 'up'
                }}
              />
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
            <MedicalCard
              title="Fluxo de Atendimento"
              subtitle="Gestão visual de pacientes e procedimentos"
              icon={ClipboardList}
              variant="gradient"
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50/80">
                  <User className="h-3 w-3 mr-1" />
                  {columns.reduce((sum, col) => sum + col.tasks.length, 0)} pacientes
                </Badge>
                <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50/80">
                  <Clock className="h-3 w-3 mr-1" />
                  Tempo real
                </Badge>
              </div>
              <KanbanBoard 
                onTaskClick={handleTaskClick}
                onCreateTask={() => {}}
              />
            </MedicalCard>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <MedicalCard
              title="Analytics Médicos"
              subtitle="Relatórios e insights clínicos"
              icon={BarChart3}
              variant="elevated"
            >
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Analytics em Desenvolvimento
                </h3>
                <p className="text-slate-500">
                  Relatórios detalhados e insights médicos estarão disponíveis em breve.
                </p>
              </div>
            </MedicalCard>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <MedicalCard
              title="Configurações do Sistema"
              subtitle="Personalize sua experiência médica"
              icon={Settings}
              variant="elevated"
            >
              <div className="text-center py-12">
                <Settings className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Configurações em Desenvolvimento
                </h3>
                <p className="text-slate-500">
                  Opções de personalização e configuração estarão disponíveis em breve.
                </p>
              </div>
            </MedicalCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
