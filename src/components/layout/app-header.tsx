"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Bell, 
  Plus,
  Clock,
  Activity,
  Shield
} from "lucide-react"
import { SearchDialog } from "@/components/ui/search-dialog"
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb"
import { StatusIndicator } from "@/components/ui/status-indicator"

interface AppHeaderProps {
  title: string
  description: string
}

export function AppHeader({ title, description }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-9 w-9" />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
            <div className="mt-1">
              <PageBreadcrumb />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Status indicators */}
          <div className="hidden md:flex items-center gap-2 mr-4">
            <StatusIndicator status="online" label="Sistema Online" size="sm" />
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Última atualização: 2min</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <Badge variant="secondary" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              LGPD
            </Badge>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <SearchDialog />
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
              <span className="sr-only">Notificações</span>
            </Button>
            <ModeToggle />
            <Button className="h-9 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Nova Anamnese
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}