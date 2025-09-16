"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  Clock, 
  Activity,
  TrendingUp,
  TrendingDown,
  Heart,
  Brain,
  Stethoscope,
  AlertTriangle
} from "lucide-react";

interface DashboardStatsProps {
  stats?: {
    totalTasks: number;
    completedTasks?: number;
    tasksByPriority: Record<string, number>;
    tasksBySyndrome: Record<string, number>;
    syndromeFrequency?: Record<string, number>;
    columns: Array<{
      id: string;
      title: string;
      count: number;
      color?: string;
    }>;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  // Dados mock se não fornecidos
  const defaultStats = {
    totalTasks: 47,
    completedTasks: 23,
    tasksByPriority: {
      'alta': 12,
      'media': 18,
      'baixa': 17
    },
    tasksBySyndrome: {
      'Síndrome Respiratória': 8,
      'Síndrome Cardiovascular': 12,
      'Síndrome Neurológica': 6,
      'Síndrome Digestiva': 9
    },
    syndromeFrequency: {
      'Síndrome Respiratória': 8,
      'Síndrome Cardiovascular': 12,
      'Síndrome Neurológica': 6,
      'Síndrome Digestiva': 9
    },
    columns: [
      { id: 'todo', title: 'Pendente', count: 15, color: 'blue' },
      { id: 'in-progress', title: 'Em Andamento', count: 9, color: 'orange' },
      { id: 'completed', title: 'Concluído', count: 23, color: 'green' }
    ]
  };

  const data = stats || defaultStats;

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'alta': return 'text-red-600';
      case 'media': return 'text-orange-600';
      case 'baixa': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getSyndromeIcon = (syndrome: string) => {
    if (syndrome.includes('Respiratória')) return Heart;
    if (syndrome.includes('Cardiovascular')) return Activity;
    if (syndrome.includes('Neurológica')) return Brain;
    return Stethoscope;
  };

  const getColumnProgress = (count: number, total: number) => {
    return Math.round((count / total) * 100);
  };

  return (
    <>
      {/* Cards de Estatísticas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total de Pacientes */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              Total de Pacientes
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{data.totalTasks}</div>
            <p className="text-xs text-blue-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        {/* Consultas Concluídas */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Consultas Concluídas
            </CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {data.completedTasks || 23}
            </div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8% esta semana
            </p>
          </CardContent>
        </Card>

        {/* Atendimentos Pendentes */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">
              Atendimentos Pendentes
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">
              {data.totalTasks - (data.completedTasks || 23)}
            </div>
            <p className="text-xs text-orange-600 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Requer atenção
            </p>
          </CardContent>
        </Card>

        {/* Taxa de Sucesso */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">
              Taxa de Sucesso
            </CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">94.2%</div>
            <p className="text-xs text-purple-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Acima da média
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de Síndromes e Prioridades */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Distribuição por Síndrome */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Distribuição por Síndrome</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(data.syndromeFrequency || data.tasksBySyndrome).map(([syndrome, count]) => {
                const IconComponent = getSyndromeIcon(syndrome);
                const percentage = getColumnProgress(count as number, data.totalTasks);
                return (
                  <div key={syndrome} className="flex items-center space-x-4">
                    <IconComponent className="h-5 w-5 text-medical-primary" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{syndrome}</span>
                        <span className="text-sm text-slate-600">{count as number}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-medical-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Status das Consultas */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Status das Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.columns.map((column) => {
                const percentage = getColumnProgress(column.count, data.totalTasks);
                return (
                  <div key={column.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{column.title}</span>
                      <Badge variant="outline">{column.count}</Badge>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          column.color === 'blue' ? 'bg-blue-500' :
                          column.color === 'orange' ? 'bg-orange-500' :
                          column.color === 'green' ? 'bg-green-500' :
                          'bg-gray-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-600">{percentage}% do total</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por Prioridade */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Distribuição por Prioridade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(data.tasksByPriority).map(([priority, count]) => (
              <div key={priority} className="text-center p-4 bg-slate-50 rounded-lg">
                <div className={`text-2xl font-bold ${getPriorityColor(priority)}`}>
                  {count as number}
                </div>
                <div className="text-sm text-slate-600 capitalize">{priority}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {getColumnProgress(count as number, data.totalTasks)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
