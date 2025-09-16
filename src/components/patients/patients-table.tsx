"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type Patient = {
  id: string
  name: string
  age: number
  gender: "M" | "F"
  priority: "critica" | "alta" | "media" | "baixa"
  syndrome: string
  status: "aguardando" | "em_atendimento" | "concluido"
  arrivalTime: string
  lastUpdate: string
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "João Silva",
    age: 45,
    gender: "M",
    priority: "critica",
    syndrome: "Dor Torácica",
    status: "aguardando",
    arrivalTime: "14:30",
    lastUpdate: "2 min"
  },
  {
    id: "2", 
    name: "Maria Santos",
    age: 32,
    gender: "F",
    priority: "alta",
    syndrome: "Cefaleia",
    status: "em_atendimento",
    arrivalTime: "14:15",
    lastUpdate: "5 min"
  },
  {
    id: "3",
    name: "Pedro Costa",
    age: 67,
    gender: "M", 
    priority: "media",
    syndrome: "Dispneia",
    status: "concluido",
    arrivalTime: "13:45",
    lastUpdate: "15 min"
  },
  {
    id: "4",
    name: "Ana Oliveira",
    age: 28,
    gender: "F",
    priority: "baixa", 
    syndrome: "Dor Abdominal",
    status: "aguardando",
    arrivalTime: "14:45",
    lastUpdate: "1 min"
  }
]

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "aguardando":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "em_atendimento":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
    case "concluido":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function PatientsTable() {
  const [data] = useState<Patient[]>(mockPatients)

  const columns: ColumnDef<Patient>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar todos"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Selecionar linha"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3"
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "age",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3"
          >
            Idade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("age")} anos</div>
      ),
    },
    {
      accessorKey: "gender",
      header: "Sexo",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("gender")}</div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Prioridade",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string
        return (
          <Badge className={getPriorityColor(priority)}>
            {priority.toUpperCase()}
          </Badge>
        )
      },
    },
    {
      accessorKey: "syndrome",
      header: "Síndrome",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("syndrome")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const statusText = {
          aguardando: "Aguardando",
          em_atendimento: "Em Atendimento", 
          concluido: "Concluído"
        }[status] || status
        
        return (
          <Badge className={getStatusColor(status)}>
            {statusText}
          </Badge>
        )
      },
    },
    {
      accessorKey: "arrivalTime",
      header: "Chegada",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("arrivalTime")}</div>
      ),
    },
    {
      accessorKey: "lastUpdate",
      header: "Última Atualização",
      cell: ({ row }) => (
        <div className="text-center text-muted-foreground">
          {row.getValue("lastUpdate")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const patient = row.original

        return (
          <TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(patient.id)}
                >
                  Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Visualizar
                    </DropdownMenuItem>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ver detalhes do paciente</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Anamnese
                    </DropdownMenuItem>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Abrir formulário de anamnese</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar informações do paciente</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
        )
      },
    },
  ]

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
