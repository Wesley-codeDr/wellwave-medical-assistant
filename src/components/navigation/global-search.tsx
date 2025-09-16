"use client"

import * as React from "react"
import { Search, FileText, Users, BarChart3, Settings, Stethoscope } from "lucide-react"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const searchItems = [
  {
    title: "Nova Anamnese",
    description: "Criar uma nova anamnese",
    icon: FileText,
    href: "/anamnese",
    keywords: ["anamnese", "nova", "criar", "formulário"]
  },
  {
    title: "Pacientes",
    description: "Gerenciar pacientes",
    icon: Users,
    href: "/pacientes",
    keywords: ["pacientes", "lista", "gerenciar"]
  },
  {
    title: "Dashboard",
    description: "Visão geral do sistema",
    icon: BarChart3,
    href: "/",
    keywords: ["dashboard", "início", "overview"]
  },
  {
    title: "Analytics",
    description: "Relatórios e estatísticas",
    icon: BarChart3,
    href: "/analytics",
    keywords: ["analytics", "relatórios", "estatísticas"]
  },
  {
    title: "Configurações",
    description: "Configurações do sistema",
    icon: Settings,
    href: "/configuracoes",
    keywords: ["configurações", "settings", "preferências"]
  }
]

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  const router = useRouter()

  const filteredItems = React.useMemo(() => {
    if (!searchValue) return searchItems

    return searchItems.filter(item => 
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchValue.toLowerCase())
      )
    )
  }, [searchValue])

  const handleSelect = (href: string) => {
    setOpen(false)
    setSearchValue("")
    router.push(href)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64",
            "hover:bg-accent hover:text-accent-foreground transition-all duration-200"
          )}
        >
          <Search className="mr-2 h-4 w-4" />
          <span className="hidden lg:inline-flex">Buscar...</span>
          <span className="lg:hidden">Buscar</span>
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Buscar funcionalidades..."
            value={searchValue}
            onValueChange={setSearchValue}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup heading="Navegação">
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.title}
                  onSelect={() => handleSelect(item.href)}
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-accent transition-colors"
                >
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
