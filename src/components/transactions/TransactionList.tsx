import React from 'react'
import { Card } from '@/components/ui'
import { TransactionItem } from './TransactionItem'
import type { TransactionItemProps } from './TransactionItem'

export interface TransactionListProps {
  transactions: TransactionItemProps[]
  title?: string
  emptyMessage?: string
  onTransactionClick?: (transaction: TransactionItemProps) => void
  onTransactionDelete?: (transaction: TransactionItemProps) => void
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  title = 'Transações',
  emptyMessage = 'Nenhuma transação encontrada',
  onTransactionClick,
  onTransactionDelete,
}) => {
  return (
    <Card className="w-full">
      {title && (
        <h2 className="text-lg font-semibold text-text-primary mb-4">{title}</h2>
      )}
      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-text-tertiary mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-text-secondary">{emptyMessage}</p>
        </div>
      ) : (
        <div className="divide-y divide-divider">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              {...transaction}
              onClick={onTransactionClick ? () => onTransactionClick(transaction) : undefined}
              onDelete={onTransactionDelete ? () => onTransactionDelete(transaction) : undefined}
            />
          ))}
        </div>
      )}
    </Card>
  )
}
