import React from 'react'
import { Card } from '@/components/ui'

export interface BalanceCardProps {
  title: string
  amount: number
  trend?: {
    value: number
    isPositive: boolean
  }
  icon?: React.ReactNode
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  title,
  amount,
  trend,
  icon,
}) => {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount)

  return (
    <Card hover className="w-full">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-bold text-text-primary mb-2">
            {formattedAmount}
          </p>
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-success' : 'text-error'
                }`}
              >
                {trend.isPositive ? '+' : ''}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'percent',
                  minimumFractionDigits: 1,
                }).format(trend.value / 100)}
              </span>
              <span className="text-xs text-text-tertiary">vs mês anterior</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
