"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, FileText, Users, BarChart3, Settings } from "lucide-react"

const pathMap: Record<string, { label: string; icon?: React.ComponentType<{ className?: string }> }> = {
  "/": { label: "Dashboard", icon: Home },
  "/anamnese": { label: "Anamnese", icon: FileText },
  "/pacientes": { label: "Pacientes", icon: Users },
  "/analytics": { label: "Analytics", icon: BarChart3 },
  "/configuracoes": { label: "Configurações", icon: Settings },
}

export function BreadcrumbNav() {
  const pathname = usePathname()
  
  const pathSegments = pathname.split("/").filter(Boolean)
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/")
    const config = pathMap[path]
    
    return {
      path,
      label: config?.label || segment.charAt(0).toUpperCase() + segment.slice(1),
      icon: config?.icon,
      isLast: index === pathSegments.length - 1
    }
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Início
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems.map((item, index) => (
          <div key={item.path} className="flex items-center">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage className="flex items-center gap-2">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.path} className="flex items-center gap-2">
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
