import React from 'react'
import { Card } from '@/components/ui'

export interface UpcomingExpense {
  id: string
  description: string
  amount: number
  dueDate: string
  card: string
  cardLastDigits: string
}

export interface UpcomingExpensesSectionProps {
  expenses: UpcomingExpense[]
  onAdd?: () => void
}

export const UpcomingExpensesSection: React.FC<UpcomingExpensesSectionProps> = ({
  expenses,
  onAdd,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  }

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Próximas despesas</h3>
        {onAdd && (
          <button
            onClick={onAdd}
            className="p-1 rounded-md hover:bg-surface transition-colors text-text-tertiary hover:text-text-primary"
            aria-label="Adicionar despesa"
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
      </div>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between py-2 border-b border-divider last:border-0"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {expense.description}
                </p>
                <p className="text-xs text-text-secondary">
                  Vence dia {formatDate(expense.dueDate)} • {expense.card} **** {expense.cardLastDigits}
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold text-text-primary flex-shrink-0 ml-2">
              {formatCurrency(expense.amount)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
