import React from 'react'
import { Card } from '@/components/ui'
import { Badge } from '@/components/ui'

export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
}

export interface TransactionListProps {
  transactions: Transaction[]
  title?: string
  maxItems?: number
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  title = 'Transações Recentes',
  maxItems = 5,
}) => {
  const displayedTransactions = transactions.slice(0, maxItems)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
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
    <Card>
      <h2 className="text-lg font-semibold text-text-primary mb-4">{title}</h2>
      {displayedTransactions.length === 0 ? (
        <p className="text-sm text-text-secondary text-center py-8">
          Nenhuma transação encontrada
        </p>
      ) : (
        <div className="space-y-3">
          {displayedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-2 border-b border-divider last:border-0"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {transaction.description}
                  </p>
                  <Badge variant="secondary" size="sm">
                    {transaction.category}
                  </Badge>
                </div>
                <p className="text-xs text-text-tertiary">
                  {formatDate(transaction.date)}
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <p
                  className={`text-sm font-semibold ${
                    transaction.type === 'income' ? 'text-success' : 'text-error'
                  }`}
                >
                  {formatAmount(transaction.amount, transaction.type)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
