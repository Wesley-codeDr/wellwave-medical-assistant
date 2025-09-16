import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MedicalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'emergency' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function MedicalButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className,
  disabled,
  loading,
  ...props
}: MedicalButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 border border-slate-300",
    emergency: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl",
    success: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-600"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm h-9",
    md: "px-6 py-3 text-base h-11", 
    lg: "px-8 py-4 text-lg h-14"
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0",
        "focus:ring-4 focus:ring-blue-500/20 focus:outline-none",
        "rounded-xl border-0",
        variants[variant],
        sizes[size],
        loading && "opacity-70 cursor-not-allowed",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : Icon ? (
          <Icon className="w-4 h-4" />
        ) : null}
        {children}
      </div>
    </Button>
  );
}
