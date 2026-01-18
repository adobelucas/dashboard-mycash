import React from 'react'
import { Card } from '@/components/ui'
import { Avatar, Input, Select } from '@/components/ui'

export interface DetailedStatementTransaction {
  id: string
  member: {
    id: string
    name: string
    avatar?: string
  }
  date: string
  description: string
  category: string
  account: string
  installments?: string
  amount: number
  type: 'income' | 'expense'
}

export interface DetailedStatementProps {
  transactions: DetailedStatementTransaction[]
  searchQuery?: string
  onSearchChange?: (query: string) => void
  filterType?: string
  onFilterTypeChange?: (type: string) => void
  currentPage?: number
  totalPages?: number
  totalItems?: number
  onPageChange?: (page: number) => void
}

export const DetailedStatement: React.FC<DetailedStatementProps> = ({
  transactions,
  searchQuery = '',
  onSearchChange,
  filterType = 'all',
  onFilterTypeChange,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Math.abs(value))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <Card className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-text-tertiary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-text-primary">Extrato detalhado</h3>
        </div>
        <div className="flex items-center gap-2">
          {onSearchChange && (
            <div className="relative w-48">
              <Input
                type="search"
                placeholder="Buscar lançamentos"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          )}
          {onFilterTypeChange && (
            <Select
              value={filterType}
              onChange={(e) => onFilterTypeChange(e.target.value)}
              options={[
                { value: 'all', label: 'Todos' },
                { value: 'income', label: 'Receitas' },
                { value: 'expense', label: 'Despesas' },
              ]}
              className="w-32 text-sm"
            />
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-divider">
              <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary">Membro</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary">Datas</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary">Descrição</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary">Categorias</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary">Conta/cartão</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary">Parcelas</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary">Valor</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-divider hover:bg-surface/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={transaction.member.avatar}
                      alt={transaction.member.name}
                      size="sm"
                      fallback={transaction.member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    />
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-text-secondary">{formatDate(transaction.date)}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {transaction.type === 'expense' ? (
                      <span className="text-error">↑</span>
                    ) : (
                      <span className="text-success">↓</span>
                    )}
                    <span className="text-sm text-text-primary">{transaction.description}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-text-secondary">{transaction.category}</td>
                <td className="py-3 px-4 text-sm text-text-secondary">{transaction.account}</td>
                <td className="py-3 px-4 text-sm text-text-secondary">{transaction.installments || '-'}</td>
                <td className={`py-3 px-4 text-sm font-semibold text-right ${
                  transaction.type === 'income' ? 'text-success' : 'text-error'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-divider">
          <p className="text-sm text-text-secondary">
            Mostrando {(currentPage - 1) * 5 + 1} a {Math.min(currentPage * 5, totalItems)} de {totalItems}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-text-secondary hover:text-text-primary"
              aria-label="Página anterior"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                  }`}
                >
                  {page}
                </button>
              )
            })}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-text-secondary hover:text-text-primary"
              aria-label="Próxima página"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </Card>
  )
}
