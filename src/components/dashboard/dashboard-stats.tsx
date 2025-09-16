'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  AlertTriangle, 
  Clock, 
  Activity,
  TrendingUp,
  Heart,
  Brain,
  Wind,
  Zap,
  Thermometer,
  BarChart3
} from 'lucide-react';
import { getDashboardStats, Column } from '@/lib/mock-data';

interface DashboardStatsProps {
  columns: Column[];
}

export function DashboardStats({ columns }: DashboardStatsProps) {
  const stats = getDashboardStats(columns);

  const getSyndromeIcon = (syndrome: string) => {
    switch (syndrome) {
      case 'Dor torácica':
        return <Heart className="h-4 w-4" />;
      case 'Cefaleia':
        return <Brain className="h-4 w-4" />;
      case 'Dispneia':
        return <Wind className="h-4 w-4" />;
      case 'Dor abdominal':
        return <Zap className="h-4 w-4" />;
      case 'Febre':
        return <Thermometer className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critica':
        return 'text-red-600 bg-red-50 dark:bg-red-950';
      case 'alta':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-950';
      case 'media':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950';
      case 'baixa':
        return 'text-green-600 bg-green-50 dark:bg-green-950';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
    }
  };

  const getColumnProgress = (columnCount: number, totalTasks: number) => {
    if (totalTasks === 0) return 0;
    return Math.round((columnCount / totalTasks) * 100);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total de Tarefas */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Total de Tarefas
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">{stats.totalTasks}</div>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80 font-medium">
              Ativas no sistema
            </p>
          </CardContent>
        </Card>

        {/* Tarefas Críticas */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-950/50 dark:to-rose-950/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-red-700 dark:text-red-300">
              Tarefas Críticas
            </CardTitle>
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-red-900 dark:text-red-100 mb-1">
              {stats.tasksByPriority.critica || 0}
            </div>
            <p className="text-xs text-red-600/80 dark:text-red-400/80 font-medium">
              Requerem atenção imediata
            </p>
          </CardContent>
        </Card>

        {/* Tarefas em Atendimento */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-amber-700 dark:text-amber-300">
              Em Atendimento
            </CardTitle>
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-1">
              {stats.columns.find(col => col.id === 'em_atendimento')?.count || 0}
            </div>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/80 font-medium">
              Sendo atendidas agora
            </p>
          </CardContent>
        </Card>

        {/* Taxa de Conclusão */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300">
              Taxa de Conclusão
            </CardTitle>
            <div className="p-2 rounded-lg bg-green-500/10">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-green-900 dark:text-green-100 mb-1">
              {stats.totalTasks > 0 
                ? Math.round(((stats.columns.find(col => col.id === 'concluido')?.count || 0) / stats.totalTasks) * 100)
                : 0}%
            </div>
            <p className="text-xs text-green-600/80 dark:text-green-400/80 font-medium">
              Tarefas finalizadas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por Prioridade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            Distribuição por Prioridade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.tasksByPriority).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <Badge className={`${getPriorityColor(priority)} capitalize font-semibold px-3 py-1`}>
                    {priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-foreground min-w-[2rem] text-right">{count}</span>
                  <Progress 
                    value={getColumnProgress(count, stats.totalTasks)} 
                    className="w-24 h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Distribuição por Síndrome */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-secondary/10">
              <Heart className="h-4 w-4 text-secondary-foreground" />
            </div>
            Distribuição por Síndrome
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.tasksBySyndrome).map(([syndrome, count]) => (
              <div key={syndrome} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {getSyndromeIcon(syndrome)}
                  </div>
                  <span className="text-sm font-semibold">{syndrome}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-foreground min-w-[2rem] text-right">{count}</span>
                  <Progress 
                    value={getColumnProgress(count, stats.totalTasks)} 
                    className="w-24 h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Status das Colunas */}
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="p-2 rounded-lg bg-accent/10">
            <BarChart3 className="h-4 w-4 text-accent-foreground" />
          </div>
          Status das Colunas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.columns.map((column) => (
            <div key={column.id} className="text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover:scale-105">
              <div className="text-3xl font-bold mb-2 text-primary">{column.count}</div>
              <div className="text-sm font-semibold text-foreground mb-3">
                {column.title}
              </div>
              <Progress 
                value={getColumnProgress(column.count, stats.totalTasks)} 
                className="h-3"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    </>
  );
}
