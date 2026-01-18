import React from 'react'
import { Card } from '@/components/ui'
import { Badge } from '@/components/ui'

export interface CardItemProps {
  id: string
  name: string
  number: string
  type: 'credit' | 'debit'
  brand: 'visa' | 'mastercard' | 'elo' | 'other'
  limit?: number
  availableLimit?: number
  onClick?: () => void
  onDelete?: () => void
}

export const CardItem: React.FC<CardItemProps> = ({
  name,
  number,
  type,
  brand,
  limit,
  availableLimit,
  onClick,
  onDelete,
}) => {
  const maskedNumber = `**** **** **** ${number.slice(-4)}`
  
  const brandColors = {
    visa: 'bg-blue-600',
    mastercard: 'bg-red-600',
    elo: 'bg-orange-600',
    other: 'bg-gray-600',
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <Card hover className="w-full cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-text-primary">{name}</h3>
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                className="p-2 rounded-md hover:bg-error/10 text-error hover:text-error transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Excluir cartão"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-sm text-text-secondary font-mono">{maskedNumber}</p>
        </div>
        <div className={`w-12 h-8 rounded ${brandColors[brand]}`} />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-text-tertiary mb-1">
            {type === 'credit' ? 'Limite disponível' : 'Tipo'}
          </p>
          {type === 'credit' && availableLimit !== undefined ? (
            <p className="text-sm font-semibold text-text-primary">
              {formatCurrency(availableLimit)}
            </p>
          ) : (
            <Badge variant="secondary" size="sm">
              {type === 'credit' ? 'Crédito' : 'Débito'}
            </Badge>
          )}
        </div>
        {type === 'credit' && limit !== undefined && (
          <div className="text-right">
            <p className="text-xs text-text-tertiary mb-1">Limite total</p>
            <p className="text-sm font-medium text-text-secondary">
              {formatCurrency(limit)}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
