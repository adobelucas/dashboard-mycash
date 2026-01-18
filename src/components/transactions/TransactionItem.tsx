import React from 'react'
import { Badge } from '@/components/ui'

export interface TransactionItemProps {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  onClick?: () => void
  onDelete?: () => void
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  description,
  amount,
  type,
  category,
  date,
  onClick,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje'
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem'
    }

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    }).format(date)
  }

  const formatAmount = (amount: number, type: 'income' | 'expense') => {
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Math.abs(amount))

    return type === 'income' ? `+${formatted}` : `-${formatted}`
  }

  return (
    <div
      className={`
        flex items-center justify-between py-4 px-4 rounded-lg
        border-b border-divider last:border-0
        ${onClick ? 'cursor-pointer hover:bg-surface transition-colors' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
            ${type === 'income' ? 'bg-success/10' : 'bg-error/10'}
          `}
        >
          {type === 'income' ? (
            <svg
              className="w-5 h-5 text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-error"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-medium text-text-primary truncate">
              {description}
            </p>
            <Badge variant="secondary" size="sm">
              {category}
            </Badge>
          </div>
          <p className="text-xs text-text-tertiary">{formatDate(date)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
        <p
          className={`text-sm font-semibold ${
            type === 'income' ? 'text-success' : 'text-error'
          }`}
        >
          {formatAmount(amount, type)}
        </p>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="p-2 rounded-md hover:bg-error/10 text-error hover:text-error transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Excluir transação"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
