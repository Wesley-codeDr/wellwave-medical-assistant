'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Kanban, 
  BarChart3, 
  Settings, 
  Plus
} from 'lucide-react';
import { KanbanBoard } from './kanban-board';
import { DashboardStats } from './dashboard-stats';
import { NewTaskModal } from './new-task-modal';
import { AppSidebar } from './app-sidebar';
import { getInitialColumns, Column, Task } from '@/lib/mock-data';

export function Dashboard() {
  const [columns, setColumns] = useState<Column[]>(getInitialColumns());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    // Aqui você pode abrir um modal de detalhes ou navegar para a página de anamnese
    console.log('Task clicked:', task);
  };

  const handleCreateTask = (newTask: any) => {
    // Adicionar nova tarefa à coluna de entrada
    setColumns(prevColumns => 
      prevColumns.map(col => 
        col.id === 'entrada' 
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );
  };

  const handleNewTaskClick = () => {
    // O modal será aberto pelo componente NewTaskModal
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <Tabs defaultValue="kanban" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="kanban" className="flex items-center gap-2 text-sm font-medium">
              <Kanban className="h-4 w-4" />
              <span className="hidden sm:inline">Kanban</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 text-sm font-medium">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 text-sm font-medium">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Configurações</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="space-y-6">
            {/* Estatísticas Rápidas */}
            <DashboardStats columns={columns} />
            
            {/* Board Kanban */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Kanban className="h-5 w-5 text-primary" />
                    </div>
                    Board Kanban
                  </CardTitle>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Badge variant="outline" className="text-xs">
                      {columns.reduce((sum, col) => sum + col.tasks.length, 0)} tarefas
                    </Badge>
                    <NewTaskModal onTaskCreate={handleCreateTask}>
                      <Button size="sm" className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                        <Plus className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Nova Tarefa</span>
                        <span className="sm:hidden">Nova</span>
                      </Button>
                    </NewTaskModal>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <KanbanBoard 
                  onTaskClick={handleTaskClick}
                  onCreateTask={handleNewTaskClick}
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
