import React from 'react'
import { Card } from '@/components/ui'

export interface CardAccount {
  id: string
  name: string
  balance: number
  dueDay: number
  lastDigits: string
}

export interface CardsAccountsSectionProps {
  accounts: CardAccount[]
  onAdd?: () => void
  onViewAll?: () => void
}

export const CardsAccountsSection: React.FC<CardsAccountsSectionProps> = ({
  accounts,
  onAdd,
  onViewAll,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Cards & contas</h3>
        <div className="flex items-center gap-2">
          {onAdd && (
            <button
              onClick={onAdd}
              className="p-1 rounded-md hover:bg-surface transition-colors text-text-tertiary hover:text-text-primary"
              aria-label="Adicionar cartão"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          )}
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="p-1 rounded-md hover:bg-surface transition-colors text-text-tertiary hover:text-text-primary"
              aria-label="Ver todos"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="space-y-3">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between py-2 border-b border-divider last:border-0"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">{account.name}</p>
              <p className="text-xs text-text-secondary">
                Vence dia {account.dueDay} • **** {account.lastDigits}
              </p>
            </div>
            <p className="text-sm font-semibold text-text-primary">
              {formatCurrency(account.balance)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
