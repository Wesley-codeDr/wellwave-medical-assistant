"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  XCircle,
  Activity,
  Pause
} from "lucide-react"

interface StatusIndicatorProps {
  status: "online" | "offline" | "warning" | "error" | "pending" | "active" | "inactive"
  label?: string
  showIcon?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const statusConfig = {
  online: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    badgeColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    label: "Online"
  },
  offline: {
    icon: XCircle,
    color: "text-gray-600",
    bgColor: "bg-gray-100 dark:bg-gray-900/20",
    badgeColor: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    label: "Offline"
  },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    badgeColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    label: "Atenção"
  },
  error: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100 dark:bg-red-900/20",
    badgeColor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    label: "Erro"
  },
  pending: {
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    label: "Pendente"
  },
  active: {
    icon: Activity,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    badgeColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    label: "Ativo"
  },
  inactive: {
    icon: Pause,
    color: "text-gray-600",
    bgColor: "bg-gray-100 dark:bg-gray-900/20",
    badgeColor: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    label: "Inativo"
  }
}

const sizeClasses = {
  sm: "h-2 w-2",
  md: "h-3 w-3", 
  lg: "h-4 w-4"
}

export function StatusIndicator({ 
  status, 
  label, 
  showIcon = true, 
  size = "md",
  className 
}: StatusIndicatorProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  if (label) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {showIcon && (
          <div className={cn("relative", sizeClasses[size])}>
            <div className={cn("absolute inset-0 rounded-full animate-pulse", config.bgColor)} />
            <Icon className={cn("relative", config.color, sizeClasses[size])} />
          </div>
        )}
        <span className="text-sm font-medium">{label || config.label}</span>
      </div>
    )
  }

  return (
    <Badge className={cn(config.badgeColor, "flex items-center gap-1", className)}>
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </Badge>
  )
}

export function StatusDot({ 
  status, 
  size = "md",
  className 
}: Omit<StatusIndicatorProps, "label" | "showIcon">) {
  const config = statusConfig[status]
  
  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "rounded-full", 
        sizeClasses[size],
        config.bgColor,
        "animate-pulse"
      )} />
      <div className={cn(
        "absolute inset-0 rounded-full",
        sizeClasses[size],
        config.color,
        "opacity-60"
      )} />
    </div>
  )
}
