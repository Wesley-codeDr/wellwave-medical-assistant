"use client"

import * as React from "react"
import { useApp } from "@/contexts/app-context"
import { Dashboard } from "@/components/dashboard/dashboard-improved"
import RestructuredAnamneseForm from "@/components/anamnese/restructured-anamnese-form"
import { PatientsPage } from "@/components/patients/patients-page"
import { MedicalPixPayment } from "@/components/payment/medical-pix-payment"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  BarChart3, 
  Settings, 
  FileText,
  Stethoscope,
  Heart,
  Brain,
  Wind,
  Zap,
  Thermometer,
  Clock,
  Activity,
  CreditCard
} from "lucide-react"

export function AppRouter() {
  const { currentPage } = useApp()

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "anamnese":
        return <RestructuredAnamneseForm />
      case "pacientes":
        return <PatientsPage />
      case "analytics":
        return <AnalyticsPage />
      case "configuracoes":
        return <ConfiguracoesPage />
      case "payment":
        return <PaymentPage />
      default:
        return <Dashboard />
    }
  }

  return <>{renderPage()}</>
}

function PacientesPage() {
  const pacientes = [
    {
      id: "1",
      nome: "João Silva",
      idade: 45,
      sexo: "M",
      queixa: "Dor Torácica",
      data: "2024-01-15",
      status: "Ativo",
      icon: Heart,
      color: "text-red-600"
    },
    {
      id: "2", 
      nome: "Maria Santos",
      idade: 32,
      sexo: "F",
      queixa: "Cefaleia",
      data: "2024-01-15",
      status: "Alta",
      icon: Brain,
      color: "text-blue-600"
    },
    {
      id: "3",
      nome: "Pedro Costa",
      idade: 67,
      sexo: "M", 
      queixa: "Dispneia",
      data: "2024-01-14",
      status: "Internado",
      icon: Wind,
      color: "text-green-600"
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gestão de Pacientes
          </CardTitle>
          <CardDescription>
            Histórico e informações dos pacientes atendidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pacientes.map((paciente) => (
              <Card key={paciente.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <paciente.icon className={`h-5 w-5 ${paciente.color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{paciente.nome}</h3>
                      <p className="text-sm text-muted-foreground">
                        {paciente.idade} anos, {paciente.sexo}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Queixa:</span>
                      <Badge variant="outline">{paciente.queixa}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data:</span>
                      <span className="text-sm text-muted-foreground">{paciente.data}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status:</span>
                      <Badge variant={paciente.status === "Ativo" ? "default" : paciente.status === "Alta" ? "secondary" : "destructive"}>
                        {paciente.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AnalyticsPage() {
  const stats = [
    {
      title: "Total de Atendimentos",
      value: "156",
      change: "+12%",
      icon: Activity,
      color: "text-blue-600"
    },
    {
      title: "Dor Torácica",
      value: "45",
      change: "+8%",
      icon: Heart,
      color: "text-red-600"
    },
    {
      title: "Cefaleia",
      value: "32",
      change: "+15%",
      icon: Brain,
      color: "text-blue-600"
    },
    {
      title: "Dispneia",
      value: "28",
      change: "+5%",
      icon: Wind,
      color: "text-green-600"
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Analytics e Relatórios
          </CardTitle>
          <CardDescription>
            Estatísticas e análises do sistema de anamnese
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center py-12 text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Gráficos detalhados em desenvolvimento</p>
            <p className="text-sm">Esta seção será implementada na Fase 3 do projeto</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ConfiguracoesPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações do Sistema
          </CardTitle>
          <CardDescription>
            Configurações e preferências do sistema de anamnese
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Painel administrativo em desenvolvimento</p>
            <p className="text-sm">Configurações avançadas serão implementadas na Fase 2</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PaymentPage() {
  const pixCode = "00020101021226990014br.gov.bcb.pix2577pix-qrcode.magfinancas.com.br/cob/cb8a1b93bb74492a8caac5cd9e77b5cc98942886cd55204000053039865802BR5911MAG SEGUROS6014RIO DE JANEIRO61082006000062070503***6304961E";

  const handlePaymentComplete = () => {
    console.log('Pagamento concluído com sucesso!');
    // Aqui você pode adicionar lógica para redirecionar ou atualizar o estado da aplicação
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Pagamento de Consulta Médica
          </h1>
          <p className="text-slate-600">
            Complete o pagamento via PIX para confirmar seu agendamento
          </p>
        </div>

        <MedicalPixPayment 
          pixCode={pixCode}
          onPaymentComplete={handlePaymentComplete}
        />

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Dúvidas sobre o pagamento? Entre em contato com nossa equipe de suporte médico.
          </p>
        </div>
      </div>
    </div>
  );
}
    </div>
  )
}
