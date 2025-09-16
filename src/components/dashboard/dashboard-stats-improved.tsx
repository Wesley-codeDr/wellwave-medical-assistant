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
  Stethoscope,
  Thermometer,
  BarChart3,
  CheckCircle,
  Timer,
  UserCheck,
  Zap
} from 'lucide-react';
import { getDashboardStats, Column } from '@/lib/mock-data';

interface DashboardStatsProps {
  columns: Column[];
}

export function DashboardStats({ columns }: DashboardStatsProps) {
  const stats = getDashboardStats(columns);

  const medicalKPIs = [
    {
      title: "Pacientes Ativos",
      value: stats.totalTasks,
      subtitle: "Total em atendimento",
      icon: Users,
      color: "blue",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      iconBg: "bg-blue-500/10",
      textColor: "text-blue-700",
      valueColor: "text-blue-900"
    },
    {
      title: "Casos Críticos",
      value: stats.tasksByPriority.critica || 0,
      subtitle: "Requerem atenção urgente",
      icon: AlertTriangle,
      color: "red",
      bgGradient: "from-red-500/10 to-pink-500/10",
      iconBg: "bg-red-500/10",
      textColor: "text-red-700",
      valueColor: "text-red-900"
    },
    {
      title: "Taxa de Conclusão",
      value: `${Math.round((stats.columns.find(c => c.id === 'concluido')?.count || 0 / stats.totalTasks) * 100)}%`,
      subtitle: "Casos finalizados hoje",
      icon: CheckCircle,
      color: "green",
      bgGradient: "from-green-500/10 to-emerald-500/10",
      iconBg: "bg-green-500/10",
      textColor: "text-green-700",
      valueColor: "text-green-900"
    },
    {
      title: "Tempo Médio",
      value: "32min",
      subtitle: "Por atendimento",
      icon: Timer,
      color: "purple",
      bgGradient: "from-purple-500/10 to-violet-500/10",
      iconBg: "bg-purple-500/10",
      textColor: "text-purple-700",
      valueColor: "text-purple-900"
    }
  ];

  const getSyndromeIcon = (syndrome: string) => {
    switch (syndrome) {
      case 'Dor torácica':
        return <Heart className="h-5 w-5" />;
      case 'Cefaleia':
        return <Brain className="h-5 w-5" />;
      case 'Dispneia':
        return <Wind className="h-5 w-5" />;
      case 'Dor abdominal':
        return <Stethoscope className="h-5 w-5" />;
      case 'Febre':
        return <Thermometer className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critica':
        return 'bg-red-500 text-white';
      case 'alta':
        return 'bg-orange-500 text-white';
      case 'media':
        return 'bg-yellow-500 text-white';
      case 'baixa':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getColumnProgress = (columnCount: number, totalTasks: number) => {
    if (totalTasks === 0) return 0;
    return Math.round((columnCount / totalTasks) * 100);
  };

  return (
    <>
      {/* KPIs Médicos Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {medicalKPIs.map((kpi, index) => (
          <Card key={index} className={`group relative overflow-hidden border-0 bg-gradient-to-br ${kpi.bgGradient} shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12" />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <div className="space-y-1">
                <CardTitle className={`text-sm font-semibold ${kpi.textColor}`}>
                  {kpi.title}
                </CardTitle>
                <p className={`text-xs ${kpi.textColor}/70`}>
                  {kpi.subtitle}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${kpi.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                <kpi.icon className={`h-6 w-6 ${kpi.textColor}`} />
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className={`text-3xl font-bold ${kpi.valueColor} mb-2`}>
                {kpi.value}
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className={`h-4 w-4 ${kpi.textColor}`} />
                <span className={`text-xs font-medium ${kpi.textColor}`}>
                  +8.2% hoje
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estatísticas Detalhadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Distribuição por Prioridade */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-900">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              Distribuição por Prioridade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(stats.tasksByPriority).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={`${getPriorityColor(priority)} px-3 py-1 text-xs font-medium capitalize`}>
                    {priority}
                  </Badge>
                  <span className="text-sm font-medium text-slate-700">{count} casos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={getColumnProgress(count, stats.totalTasks)} 
                    className="w-20 h-2"
                  />
                  <span className="text-xs text-slate-500 w-10 text-right">
                    {getColumnProgress(count, stats.totalTasks)}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Fluxo de Atendimento */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-900">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              Fluxo de Atendimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {columns.map((column) => (
              <div key={column.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${column.color}`} />
                  <span className="text-sm font-medium text-slate-700 capitalize">
                    {column.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    {column.tasks.length}
                  </span>
                  <Progress 
                    value={getColumnProgress(column.tasks.length, stats.totalTasks)} 
                    className="w-20 h-2"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Síndromes Mais Frequentes */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-900">
            <div className="p-2 rounded-lg bg-green-500/10">
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
            Síndromes Mais Frequentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(stats.syndromeFrequency).map(([syndrome, count]) => (
              <div key={syndrome} className="group p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 hover:from-blue-50 hover:to-blue-100 transition-all duration-300 border border-slate-200 hover:border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-white shadow-sm group-hover:bg-blue-50 transition-colors duration-300">
                    {getSyndromeIcon(syndrome)}
                  </div>
                  <Badge variant="secondary" className="text-xs font-bold bg-white/80">
                    {count}
                  </Badge>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 mb-1">{syndrome}</h4>
                <p className="text-xs text-slate-600">
                  {Math.round((count / stats.totalTasks) * 100)}% dos casos
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
