import React from 'react'
import { Card } from '@/components/ui'

export interface SummaryCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  variant?: 'default' | 'success' | 'error' | 'warning'
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  variant = 'default',
}) => {
  const variantStyles = {
    default: 'text-text-primary',
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
  }

  return (
    <Card hover className="w-full">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-text-secondary mb-1">{title}</p>
          <p className={`text-xl font-semibold mb-1 ${variantStyles[variant]}`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-text-tertiary">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
