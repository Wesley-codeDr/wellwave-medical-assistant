import React from 'react';
import { MedicalPixPayment } from '@/components/payment/medical-pix-payment';

export default function PaymentPage() {
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
