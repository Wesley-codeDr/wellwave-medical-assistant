"use client"

import * as React from "react"
import { useApp } from "@/contexts/app-context"
import { Dashboard } from "@/components/dashboard/dashboard-fixed"
import RestructuredAnamneseForm from "@/components/anamnese/restructured-anamnese-form"
import { PatientsPage } from "@/components/patients/patients-page"
import { MedicalPixPayment } from "@/components/payment/medical-pix-payment"
import DataProcessor from "@/components/data/data-processor"
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
  CreditCard,
  Calculator
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
      case "data-analysis":
        return <DataProcessor />
      default:
        return <Dashboard />
    }
  }

  return <>{renderPage()}</>
}

function AnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Analytics Médicos
          </CardTitle>
          <CardDescription>
            Análise de dados clínicos e métricas de atendimento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Sistema de analytics em desenvolvimento</p>
            <p className="text-sm">Relatórios detalhados serão implementados na Fase 2</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ConfiguracoesPage() {
  return (
    <div className="space-y-6 p-6">
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
