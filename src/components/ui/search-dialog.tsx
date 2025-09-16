"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SearchDialogProps {
  children?: React.ReactNode
}

export function SearchDialog({ children }: SearchDialogProps) {
  const [open, setOpen] = React.useState(false)

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2">
            <Search className="h-4 w-4 xl:mr-2" />
            <span className="hidden xl:inline-flex">Buscar pacientes, anamneses...</span>
            <span className="sr-only">Buscar</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        {/* Add an accessible dialog title (visually hidden) to satisfy Radix's requirement */}
        <DialogHeader>
          <DialogTitle className="sr-only">Buscar</DialogTitle>
        </DialogHeader>
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <CommandInput placeholder="Buscar pacientes, anamneses, síndromes..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup heading="Pacientes Recentes">
              <CommandItem
                value="paciente-1"
                onSelect={() => {
                  runCommand(() => {
                    console.log("Paciente selecionado: João Silva")
                  })
                }}
              >
                <div className="flex flex-col">
                  <span className="font-medium">João Silva</span>
                  <span className="text-sm text-muted-foreground">ID: 12345 - Dor torácica</span>
                </div>
              </CommandItem>
              <CommandItem
                value="paciente-2"
                onSelect={() => {
                  runCommand(() => {
                    console.log("Paciente selecionado: Maria Santos")
                  })
                }}
              >
                <div className="flex flex-col">
                  <span className="font-medium">Maria Santos</span>
                  <span className="text-sm text-muted-foreground">ID: 12346 - Cefaleia</span>
                </div>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Síndromes">
              <CommandItem
                value="dor-toracica"
                onSelect={() => {
                  runCommand(() => {
                    console.log("Síndrome selecionada: Dor torácica")
                  })
                }}
              >
                <div className="flex flex-col">
                  <span className="font-medium">Dor Torácica</span>
                  <span className="text-sm text-muted-foreground">2 casos ativos</span>
                </div>
              </CommandItem>
              <CommandItem
                value="cefaleia"
                onSelect={() => {
                  runCommand(() => {
                    console.log("Síndrome selecionada: Cefaleia")
                  })
                }}
              >
                <div className="flex flex-col">
                  <span className="font-medium">Cefaleia</span>
                  <span className="text-sm text-muted-foreground">1 caso ativo</span>
                </div>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Ações">
              <CommandItem
                value="nova-anamnese"
                onSelect={() => {
                  runCommand(() => {
                    console.log("Nova anamnese")
                  })
                }}
              >
                <div className="flex flex-col">
                  <span className="font-medium">Nova Anamnese</span>
                  <span className="text-sm text-muted-foreground">Criar nova documentação médica</span>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
