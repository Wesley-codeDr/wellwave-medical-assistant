"use client"

import React, { useState, useEffect } from 'react';
import { MedicalCard } from '@/components/ui/medical-card';
import { MedicalButton } from '@/components/ui/medical-button';
import { 
  MapPin, 
  Calculator, 
  Hash, 
  Copy, 
  CheckCircle,
  Info,
  TrendingUp,
  DollarSign,
  Navigation
} from 'lucide-react';

interface DataAnalysis {
  latitude: number;
  longitude: number;
  value1: number;
  code1: number;
  reference: string;
}

export function DataProcessor() {
  const [rawData] = useState("34191.53113 33252.018578 70164.240007 1 12010000024339");
  const [analysis, setAnalysis] = useState<DataAnalysis | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Processar os dados fornecidos
    const parts = rawData.split(' ');
    if (parts.length >= 5) {
      setAnalysis({
        latitude: parseFloat(parts[0]) / 1000, // Normalizar coordenada
        longitude: parseFloat(parts[1]) / 1000, // Normalizar coordenada
        value1: parseFloat(parts[2]),
        code1: parseInt(parts[3]),
        reference: parts[4]
      });
    }
  }, [rawData]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatCoordinate = (coord: number) => {
    return coord.toFixed(6);
  };

  if (!analysis) {
    return (
      <div className="p-6">
        <MedicalCard>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-medical-primary" />
              <h3 className="text-lg font-semibold">Processando Dados...</h3>
            </div>
            <p className="text-slate-600">Analisando os dados fornecidos...</p>
          </div>
        </MedicalCard>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Análise de Dados</h2>
        <p className="text-slate-600">Processamento e análise dos dados fornecidos</p>
      </div>

      {/* Dados Brutos */}
      <MedicalCard variant="glass">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-medical-primary" />
              <h3 className="text-lg font-semibold">Dados Originais</h3>
            </div>
            <MedicalButton
              variant="outline"
              size="sm"
              icon={copied ? CheckCircle : Copy}
              onClick={() => copyToClipboard(rawData)}
            >
              {copied ? 'Copiado!' : 'Copiar'}
            </MedicalButton>
          </div>
          <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm">
            {rawData}
          </div>
        </div>
      </MedicalCard>

      {/* Análise dos Dados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Coordenadas Geográficas */}
        <MedicalCard variant="gradient">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-white" />
              <h3 className="text-lg font-semibold text-white">Localização</h3>
            </div>
            <div className="space-y-2 text-white/90">
              <div>
                <span className="text-sm opacity-80">Latitude:</span>
                <div className="font-mono text-lg">{formatCoordinate(analysis.latitude)}°</div>
              </div>
              <div>
                <span className="text-sm opacity-80">Longitude:</span>
                <div className="font-mono text-lg">{formatCoordinate(analysis.longitude)}°</div>
              </div>
            </div>
            <MedicalButton
              variant="secondary"
              size="sm"
              icon={Navigation}
              className="mt-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
              onClick={() => {
                const url = `https://www.google.com/maps?q=${analysis.latitude},${analysis.longitude}`;
                window.open(url, '_blank');
              }}
            >
              Ver no Mapa
            </MedicalButton>
          </div>
        </MedicalCard>

        {/* Valor Financeiro */}
        <MedicalCard variant="elevated">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-medical-success" />
              <h3 className="text-lg font-semibold">Valor Monetário</h3>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-slate-600">Valor identificado:</span>
                <div className="text-2xl font-bold text-medical-success">
                  {formatCurrency(analysis.value1)}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-slate-600">
                <TrendingUp className="h-4 w-4" />
                <span>Processamento automático</span>
              </div>
            </div>
          </div>
        </MedicalCard>

        {/* Códigos e Referências */}
        <MedicalCard>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-5 w-5 text-medical-primary" />
              <h3 className="text-lg font-semibold">Códigos</h3>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-slate-600">Código Numérico:</span>
                <div className="font-mono text-lg font-semibold">{analysis.code1}</div>
              </div>
              <div>
                <span className="text-sm text-slate-600">Referência:</span>
                <div className="font-mono text-sm bg-slate-100 p-2 rounded break-all">
                  {analysis.reference}
                </div>
              </div>
            </div>
          </div>
        </MedicalCard>
      </div>

      {/* Resumo da Análise */}
      <MedicalCard variant="glass">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-medical-primary" />
            <h3 className="text-lg font-semibold">Resumo da Análise</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Dados Identificados:</h4>
              <ul className="space-y-1 text-slate-600">
                <li>• 2 coordenadas geográficas</li>
                <li>• 1 valor monetário significativo</li>
                <li>• 1 código de referência</li>
                <li>• 1 identificador longo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Possíveis Aplicações:</h4>
              <ul className="space-y-1 text-slate-600">
                <li>• Geolocalização de serviços médicos</li>
                <li>• Processamento de pagamentos</li>
                <li>• Rastreamento de transações</li>
                <li>• Identificação de procedimentos</li>
              </ul>
            </div>
          </div>
        </div>
      </MedicalCard>

      {/* Ações */}
      <div className="flex flex-wrap gap-3">
        <MedicalButton
          variant="primary"
          icon={Calculator}
          onClick={() => copyToClipboard(JSON.stringify(analysis, null, 2))}
        >
          Exportar Análise JSON
        </MedicalButton>
        
        <MedicalButton
          variant="secondary"
          icon={MapPin}
          onClick={() => {
            const coords = `${analysis.latitude},${analysis.longitude}`;
            copyToClipboard(coords);
          }}
        >
          Copiar Coordenadas
        </MedicalButton>
        
        <MedicalButton
          variant="outline"
          icon={Hash}
          onClick={() => copyToClipboard(analysis.reference)}
        >
          Copiar Referência
        </MedicalButton>
      </div>
    </div>
  );
}

export default DataProcessor;
