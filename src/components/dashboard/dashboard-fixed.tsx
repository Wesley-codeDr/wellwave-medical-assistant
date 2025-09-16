"use client"

import { useState, useEffect } from "react"
import { DashboardStats } from "@/components/dashboard/dashboard-stats-fixed"
import { KanbanBoard } from "@/components/dashboard/kanban-board"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewTaskModal } from "@/components/dashboard/new-task-modal"
import { getMockData, Task, TaskStatus } from "@/lib/mock-data"
import { 
  Activity, 
  Plus, 
  BarChart3, 
  Users, 
  Calendar,
  Clock,
  TrendingUp,
  Heart,
  Stethoscope,
  Brain
} from "lucide-react"

interface DashboardData {
  tasks: Task[]
  stats: {
    totalTasks: number
    completedTasks: number
    tasksByPriority: Record<string, number>
    tasksBySyndrome: Record<string, number>
    columns: Array<{
      id: string
      title: string
      count: number
      color?: string
    }>
  }
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setData(getMockData())
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (!data) return

    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date()
    }

    const updatedTasks = [...data.tasks, newTask]
    
    // Recalcular estatísticas
    const stats = calculateStats(updatedTasks)
    
    setData({
      tasks: updatedTasks,
      stats
    })
  }

  const calculateStats = (tasks: Task[]) => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.status === 'concluido').length
    
    const tasksByPriority = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const tasksBySyndrome = tasks.reduce((acc, task) => {
      acc[task.syndrome] = (acc[task.syndrome] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const columns = [
      { 
        id: 'entrada', 
        title: 'Entrada', 
        count: tasks.filter(t => t.status === 'entrada').length,
        color: 'blue'
      },
      { 
        id: 'em_atendimento', 
        title: 'Em Atendimento', 
        count: tasks.filter(t => t.status === 'em_atendimento').length,
        color: 'orange'
      },
      { 
        id: 'concluido', 
        title: 'Concluído', 
        count: completedTasks,
        color: 'green'
      }
    ]

    return {
      totalTasks,
      completedTasks,
      tasksByPriority,
      tasksBySyndrome,
      columns
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-slate-600">Carregando dashboard médico...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-600">Erro ao carregar dados</p>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 pt-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard Médico
          </h2>
          <p className="text-slate-600">
            Visão geral das anamneses e atendimentos
          </p>
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

      {/* Stats Cards */}
      <DashboardStats stats={data.stats} />

      {/* Kanban Board */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            Quadro de Anamneses
          </h3>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {data.stats.totalTasks} total
            </Badge>
            <Badge variant="outline" className="text-xs border-green-200 text-green-700">
              {data.stats.completedTasks} concluídas
            </Badge>
          </div>
        </div>
        
        {/* KanbanBoard temporariamente comentado
        <KanbanBoard 
          tasks={data.tasks}
          onTaskMove={(taskId: string, newStatus: TaskStatus) => {
            const updatedTasks = data.tasks.map(task =>
              task.id === taskId ? { ...task, status: newStatus } : task
            )
            const stats = calculateStats(updatedTasks)
            setData({ tasks: updatedTasks, stats })
          }}
        />
        */}
        <div className="p-8 text-center bg-white rounded-lg border-2 border-dashed border-slate-200">
          <p className="text-slate-600">Quadro Kanban em desenvolvimento</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Relatórios
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">12</div>
            <p className="text-xs text-slate-600">
              Relatórios disponíveis
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pacientes Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {data.stats.totalTasks}
            </div>
            <p className="text-xs text-slate-600">
              Em acompanhamento
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próximas Consultas
            </CardTitle>
            <Calendar className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">8</div>
            <p className="text-xs text-slate-600">
              Agendadas para hoje
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
