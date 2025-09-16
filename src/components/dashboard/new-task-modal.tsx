'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Heart, 
  Brain, 
  Wind, 
  Zap, 
  Thermometer,
  AlertTriangle,
  Clock,
  User,
  Activity
} from 'lucide-react';
import { Syndrome, SYNDROMES } from '@/lib/mock-data';

interface NewTaskModalProps {
  children?: React.ReactNode;
  onTaskCreate?: (task: any) => void;
}

export function NewTaskModal({ children, onTaskCreate }: NewTaskModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    syndrome: '' as Syndrome | '',
    priority: 'media' as 'baixa' | 'media' | 'alta' | 'critica',
    patientAge: '',
    patientGender: '' as 'M' | 'F' | '',
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    temperature: '',
    oxygenSaturation: '',
    notes: ''
  });

  const getSyndromeIcon = (syndrome: Syndrome) => {
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
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critica':
        return 'bg-red-500 text-white';
      case 'alta':
        return 'bg-orange-500 text-white';
      case 'media':
        return 'bg-yellow-500 text-black';
      case 'baixa':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTask = {
      id: Date.now().toString(),
      title: formData.title,
      syndrome: formData.syndrome,
      priority: formData.priority,
      status: 'entrada' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      patientAge: formData.patientAge ? parseInt(formData.patientAge) : undefined,
      patientGender: formData.patientGender || undefined,
      vitalSigns: {
        bloodPressure: formData.bloodPressure || undefined,
        heartRate: formData.heartRate ? parseInt(formData.heartRate) : undefined,
        respiratoryRate: formData.respiratoryRate ? parseInt(formData.respiratoryRate) : undefined,
        temperature: formData.temperature ? parseFloat(formData.temperature) : undefined,
        oxygenSaturation: formData.oxygenSaturation ? parseInt(formData.oxygenSaturation) : undefined,
      },
      notes: formData.notes || undefined
    };

    onTaskCreate?.(newTask);
    
    // Reset form
    setFormData({
      title: '',
      syndrome: '',
      priority: 'media',
      patientAge: '',
      patientGender: '',
      bloodPressure: '',
      heartRate: '',
      respiratoryRate: '',
      temperature: '',
      oxygenSaturation: '',
      notes: ''
    });
    
    setOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Nova Tarefa de Anamnese
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Título da Tarefa *
                </label>
                <Input
                  placeholder="Ex: Paciente com dor torácica aguda"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Síndrome *
                  </label>
                  <Select
                    value={formData.syndrome}
                    onValueChange={(value) => handleInputChange('syndrome', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a síndrome" />
                    </SelectTrigger>
                    <SelectContent>
                      {SYNDROMES.map((syndrome) => (
                        <SelectItem key={syndrome} value={syndrome}>
                          <div className="flex items-center gap-2">
                            {getSyndromeIcon(syndrome)}
                            {syndrome}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Prioridade *
                  </label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => handleInputChange('priority', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">
                        <Badge className="bg-green-500 text-white">Baixa</Badge>
                      </SelectItem>
                      <SelectItem value="media">
                        <Badge className="bg-yellow-500 text-black">Média</Badge>
                      </SelectItem>
                      <SelectItem value="alta">
                        <Badge className="bg-orange-500 text-white">Alta</Badge>
                      </SelectItem>
                      <SelectItem value="critica">
                        <Badge className="bg-red-500 text-white">Crítica</Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Idade do Paciente
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 45"
                    value={formData.patientAge}
                    onChange={(e) => handleInputChange('patientAge', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Sexo
                  </label>
                  <Select
                    value={formData.patientGender}
                    onValueChange={(value) => handleInputChange('patientGender', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Feminino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sinais Vitais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Sinais Vitais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Pressão Arterial
                  </label>
                  <Input
                    placeholder="Ex: 140/90"
                    value={formData.bloodPressure}
                    onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Frequência Cardíaca (bpm)
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 95"
                    value={formData.heartRate}
                    onChange={(e) => handleInputChange('heartRate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Frequência Respiratória
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 18"
                    value={formData.respiratoryRate}
                    onChange={(e) => handleInputChange('respiratoryRate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Temperatura (°C)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 37.2"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium mb-2 block">
                    Saturação de Oxigênio (%)
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 98"
                    value={formData.oxygenSaturation}
                    onChange={(e) => handleInputChange('oxygenSaturation', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Observações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Descreva os sintomas, histórico relevante, medicações em uso, etc."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          <Separator />

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Criar Tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
