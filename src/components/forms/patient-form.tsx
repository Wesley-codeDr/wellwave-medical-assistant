"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { 
  User, 
  Calendar, 
  Phone, 
  MapPin, 
  FileText,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const patientSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  age: z.number().min(0, "Idade deve ser maior que 0").max(120, "Idade deve ser menor que 120"),
  gender: z.enum(["M", "F"]),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  address: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  emergencyContact: z.string().min(2, "Contato de emergência é obrigatório"),
  emergencyPhone: z.string().min(10, "Telefone de emergência deve ter pelo menos 10 dígitos"),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  medicalHistory: z.string().optional(),
  chiefComplaint: z.string().min(5, "Queixa principal deve ter pelo menos 5 caracteres"),
  priority: z.enum(["critica", "alta", "media", "baixa"]),
})

type PatientFormData = z.infer<typeof patientSchema>

interface PatientFormProps {
  onSubmit?: (data: PatientFormData) => void
  initialData?: Partial<PatientFormData>
  mode?: "create" | "edit"
}

export function PatientForm({ onSubmit, initialData, mode = "create" }: PatientFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: initialData?.name || "",
      age: initialData?.age || 0,
      gender: initialData?.gender || undefined,
      phone: initialData?.phone || "",
      address: initialData?.address || "",
      emergencyContact: initialData?.emergencyContact || "",
      emergencyPhone: initialData?.emergencyPhone || "",
      allergies: initialData?.allergies || "",
      medications: initialData?.medications || "",
      medicalHistory: initialData?.medicalHistory || "",
      chiefComplaint: initialData?.chiefComplaint || "",
      priority: initialData?.priority || undefined,
    },
  })

  const handleSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true)
    try {
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Sucesso!",
        description: mode === "create" 
          ? "Paciente cadastrado com sucesso!" 
          : "Dados do paciente atualizados!",
      })
      
      onSubmit?.(data)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar os dados do paciente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critica":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "alta":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "media":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "baixa":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            {mode === "create" ? "Cadastrar Novo Paciente" : "Editar Paciente"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Informações Pessoais */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Informações Pessoais
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo *</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idade *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Idade" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sexo *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o sexo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="M">Masculino</SelectItem>
                            <SelectItem value="F">Feminino</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone *</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço *</FormLabel>
                      <FormControl>
                        <Input placeholder="Rua, número, bairro, cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contato de Emergência */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contato de Emergência
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emergencyContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Contato *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do contato de emergência" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emergencyPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone do Contato *</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Informações Médicas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Informações Médicas
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="allergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alergias</FormLabel>
                        <FormControl>
                          <Input placeholder="Liste as alergias conhecidas" {...field} />
                        </FormControl>
                        <FormDescription>
                          Deixe em branco se não houver alergias conhecidas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medicações em Uso</FormLabel>
                        <FormControl>
                          <Input placeholder="Liste as medicações em uso" {...field} />
                        </FormControl>
                        <FormDescription>
                          Inclua dosagens e frequência
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="medicalHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Histórico Médico</FormLabel>
                      <FormControl>
                        <Input placeholder="Doenças prévias, cirurgias, etc." {...field} />
                      </FormControl>
                      <FormDescription>
                        Informações relevantes do histórico médico
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Queixa e Prioridade */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Atendimento
                </h3>
                
                <FormField
                  control={form.control}
                  name="chiefComplaint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Queixa Principal *</FormLabel>
                      <FormControl>
                        <Input placeholder="Descreva a queixa principal do paciente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prioridade *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a prioridade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="critica">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                CRÍTICA
                              </Badge>
                              <span>Emergência imediata</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="alta">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                                ALTA
                              </Badge>
                              <span>Urgente</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="media">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                MÉDIA
                              </Badge>
                              <span>Moderada</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="baixa">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                BAIXA
                              </Badge>
                              <span>Rotineira</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {mode === "create" ? "Cadastrar Paciente" : "Salvar Alterações"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
