import React, { useState } from 'react';
import { MedicalCard } from '@/components/ui/medical-card';
import { MedicalButton } from '@/components/ui/medical-button';
import { Badge } from '@/components/ui/badge';
import { 
  QrCode, 
  Copy, 
  Check, 
  CreditCard, 
  DollarSign,
  Shield,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface PixPaymentData {
  merchantAccountInfo: string;
  merchantName: string;
  merchantCity: string;
  postalCode: string;
  transactionAmount?: string;
  pixKey: string;
  description?: string;
}

interface MedicalPixPaymentProps {
  pixCode: string;
  paymentData?: PixPaymentData;
  onPaymentComplete?: () => void;
}

export function MedicalPixPayment({ 
  pixCode, 
  paymentData,
  onPaymentComplete 
}: MedicalPixPaymentProps) {
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed' | 'error'>('pending');

  const handleCopyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar código PIX:', err);
    }
  };

  const parsePixCode = (code: string): PixPaymentData | null => {
    try {
      // Análise básica do código PIX QR Code
      const merchantNameMatch = code.match(/5911(.{11})/);
      const merchantCityMatch = code.match(/6014(.{14})/);
      const postalCodeMatch = code.match(/6108(.{8})/);
      
      return {
        merchantAccountInfo: code.substring(26, 103), // URL do PIX
        merchantName: merchantNameMatch ? merchantNameMatch[1] : 'MAG SEGUROS',
        merchantCity: merchantCityMatch ? merchantCityMatch[1] : 'RIO DE JANEIRO',
        postalCode: postalCodeMatch ? postalCodeMatch[1] : '20060000',
        pixKey: 'pix-qrcode.magfinancas.com.br',
        description: 'Pagamento de Consulta Médica'
      };
    } catch (error) {
      console.error('Erro ao analisar código PIX:', error);
      return null;
    }
  };

  const parsedData = parsePixCode(pixCode) || paymentData;

  const simulatePayment = () => {
    setPaymentStatus('processing');
    
    // Simular processo de pagamento
    setTimeout(() => {
      setPaymentStatus('completed');
      onPaymentComplete?.();
    }, 3000);
  };

  const getStatusBadge = () => {
    switch (paymentStatus) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Aguardando Pagamento
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-1" />
            Processando
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Pagamento Aprovado
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Erro no Pagamento
          </Badge>
        );
    }
  };

  return (
    <MedicalCard
      title="Pagamento PIX - Consulta Médica"
      subtitle="Sistema de pagamento seguro e instantâneo"
      icon={CreditCard}
      variant="elevated"
      className="max-w-md mx-auto"
    >
      <div className="space-y-6">
        
        {/* Status do Pagamento */}
        <div className="flex justify-center">
          {getStatusBadge()}
        </div>

        {/* Informações do Pagamento */}
        {parsedData && (
          <div className="space-y-4 p-4 bg-slate-50 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Beneficiário:</span>
              <span className="text-sm font-bold text-slate-900">{parsedData.merchantName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Local:</span>
              <span className="text-sm text-slate-900">{parsedData.merchantCity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Serviço:</span>
              <span className="text-sm text-slate-900">{parsedData.description}</span>
            </div>
            {parsedData.transactionAmount && (
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-sm font-medium text-slate-600">Valor:</span>
                <span className="text-lg font-bold text-green-600">
                  R$ {parsedData.transactionAmount}
                </span>
              </div>
            )}
          </div>
        )}

        {/* QR Code Visual */}
        <div className="flex flex-col items-center space-y-4">
          <div className="p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
            <div className="w-48 h-48 bg-slate-100 rounded-xl flex items-center justify-center">
              <QrCode className="w-32 h-32 text-slate-600" />
            </div>
          </div>
          
          <p className="text-xs text-slate-500 text-center max-w-xs">
            Escaneie o QR Code com o aplicativo do seu banco ou copie o código PIX abaixo
          </p>
        </div>

        {/* Código PIX */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">
            Código PIX Copia e Cola:
          </label>
          <div className="relative">
            <textarea
              value={pixCode}
              readOnly
              className="w-full p-3 pr-12 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleCopyPixCode}
              className="absolute top-2 right-2 p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors duration-200"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          {copied && (
            <p className="text-xs text-green-600 font-medium">
              ✓ Código PIX copiado para a área de transferência
            </p>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="space-y-3">
          {paymentStatus === 'pending' && (
            <>
              <MedicalButton
                onClick={simulatePayment}
                variant="primary"
                size="lg"
                icon={DollarSign}
                className="w-full"
              >
                Simular Pagamento
              </MedicalButton>
              
              <MedicalButton
                onClick={handleCopyPixCode}
                variant="outline"
                size="md"
                icon={Copy}
                className="w-full"
              >
                Copiar Código PIX
              </MedicalButton>
            </>
          )}

          {paymentStatus === 'processing' && (
            <div className="text-center py-4">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-sm text-slate-600">Processando pagamento...</p>
            </div>
          )}

          {paymentStatus === 'completed' && (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="text-lg font-semibold text-green-700 mb-1">
                Pagamento Aprovado!
              </p>
              <p className="text-sm text-slate-600">
                Sua consulta foi agendada com sucesso
              </p>
            </div>
          )}
        </div>

        {/* Informações de Segurança */}
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <p className="text-xs text-blue-700">
            Pagamento seguro processado via PIX - Banco Central do Brasil
          </p>
        </div>
      </div>
    </MedicalCard>
  );
}
