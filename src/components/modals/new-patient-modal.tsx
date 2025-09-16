"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PatientForm } from "@/components/forms/patient-form"
import { Plus } from "lucide-react"

interface NewPatientModalProps {
  children?: React.ReactNode
  onPatientCreated?: (patient: any) => void
}

export function NewPatientModal({ children, onPatientCreated }: NewPatientModalProps) {
  const [open, setOpen] = useState(false)

  const handlePatientCreated = (patient: any) => {
    onPatientCreated?.(patient)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
            <Plus className="h-4 w-4 mr-2" />
            Novo Paciente
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
          <DialogDescription>
            Preencha as informações do paciente para cadastrá-lo no sistema.
          </DialogDescription>
        </DialogHeader>
        <PatientForm 
          mode="create"
          onSubmit={handlePatientCreated}
        />
      </DialogContent>
    </Dialog>
  )
}
