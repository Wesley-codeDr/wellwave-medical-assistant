import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MedicalCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: 'default' | 'gradient' | 'glass' | 'elevated';
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export function MedicalCard({
  children,
  title,
  subtitle,
  icon: Icon,
  variant = 'default',
  className,
  headerClassName,
  contentClassName
}: MedicalCardProps) {
  const variants = {
    default: "bg-white border border-slate-200 shadow-sm hover:shadow-md",
    gradient: "bg-gradient-to-br from-white via-blue-50/30 to-white border-0 shadow-lg hover:shadow-xl",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl",
    elevated: "bg-white border-0 shadow-xl hover:shadow-2xl hover:-translate-y-1"
  };

  return (
    <Card className={cn(
      "transition-all duration-500 rounded-2xl overflow-hidden",
      variants[variant],
      className
    )}>
      {(title || subtitle || Icon) && (
        <CardHeader className={cn("pb-4", headerClassName)}>
          <CardTitle className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 rounded-xl bg-blue-500/10">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
            )}
            <div className="flex flex-col">
              {title && (
                <span className="text-lg font-bold text-slate-900">
                  {title}
                </span>
              )}
              {subtitle && (
                <span className="text-sm text-slate-600 font-normal">
                  {subtitle}
                </span>
              )}
            </div>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("relative", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}

interface MedicalMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'blue' | 'red' | 'green' | 'orange' | 'purple';
  className?: string;
}

export function MedicalMetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue',
  className
}: MedicalMetricCardProps) {
  const colorVariants = {
    blue: {
      bg: "from-blue-500/10 to-cyan-500/10",
      iconBg: "bg-blue-500/10",
      text: "text-blue-700",
      value: "text-blue-900"
    },
    red: {
      bg: "from-red-500/10 to-pink-500/10",
      iconBg: "bg-red-500/10",
      text: "text-red-700",
      value: "text-red-900"
    },
    green: {
      bg: "from-green-500/10 to-emerald-500/10",
      iconBg: "bg-green-500/10",
      text: "text-green-700",
      value: "text-green-900"
    },
    orange: {
      bg: "from-orange-500/10 to-yellow-500/10",
      iconBg: "bg-orange-500/10",
      text: "text-orange-700",
      value: "text-orange-900"
    },
    purple: {
      bg: "from-purple-500/10 to-violet-500/10",
      iconBg: "bg-purple-500/10",
      text: "text-purple-700",
      value: "text-purple-900"
    }
  };

  const colorScheme = colorVariants[color];

  return (
    <Card className={cn(
      "group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1",
      `bg-gradient-to-br ${colorScheme.bg}`,
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
        <div className="space-y-1">
          <CardTitle className={cn("text-sm font-semibold", colorScheme.text)}>
            {title}
          </CardTitle>
          {subtitle && (
            <p className={cn("text-xs", colorScheme.text + "/70")}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl group-hover:scale-110 transition-transform duration-300",
          colorScheme.iconBg
        )}>
          <Icon className={cn("h-6 w-6", colorScheme.text)} />
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className={cn("text-3xl font-bold mb-2", colorScheme.value)}>
          {value}
        </div>
        {trend && (
          <div className="flex items-center space-x-2">
            <span className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {trend.isPositive ? "↗" : "↘"} {trend.value}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
