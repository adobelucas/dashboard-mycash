import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BalanceCard, SummaryCard, TransactionList, QuickActions, Chart } from '@/components/dashboard'
import { Loading } from '@/components/ui'
import { useApp } from '@/contexts'
import type { QuickAction } from '@/components/dashboard'

// Dados mockados para fallback
const mockTransactions = [
  {
    id: '1',
    description: 'Salário',
    amount: 5000,
    type: 'income' as const,
    category: 'Salário',
    date: new Date().toISOString(),
  },
  {
    id: '2',
    description: 'Supermercado',
    amount: -350.50,
    type: 'expense' as const,
    category: 'Alimentação',
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    description: 'Netflix',
    amount: -29.90,
    type: 'expense' as const,
    category: 'Entretenimento',
    date: new Date(Date.now() - 172800000).toISOString(),
  },
]

  const quickActions: QuickAction[] = useMemo(() => [
    {
      label: 'Nova Receita',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      onClick: () => navigate('/transactions'),
      variant: 'primary',
    },
    {
      label: 'Nova Despesa',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      ),
      onClick: () => navigate('/transactions'),
      variant: 'outline',
    },
    {
      label: 'Transferir',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      onClick: () => navigate('/transactions'),
      variant: 'outline',
    },
    {
      label: 'Cartões',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      onClick: () => navigate('/cards'),
      variant: 'outline',
    },
  ], [navigate])

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { transactions, balance, isLoading } = useApp()

  const monthlyStats = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date)
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })

    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0)

    const expense = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + Math.abs(t.amount), 0)

    const savings = income - expense

    return { income, expense, savings }
  }, [transactions])

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 5)
  }, [transactions])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  if (isLoading) {
    return <Loading fullScreen message="Carregando dashboard..." />
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Dashboard
        </h1>
        <p className="text-sm text-text-secondary">
          Visão geral das suas finanças
        </p>
      </div>

      {/* Cards de Saldo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BalanceCard
          title="Saldo Total"
          amount={balance}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <SummaryCard
          title="Receitas do Mês"
          value={formatCurrency(monthlyStats.income)}
          variant="success"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <SummaryCard
          title="Despesas do Mês"
          value={formatCurrency(monthlyStats.expense)}
          variant="error"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          }
        />
        <SummaryCard
          title="Economia do Mês"
          value={formatCurrency(monthlyStats.savings)}
          variant={monthlyStats.savings >= 0 ? 'success' : 'error'}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Ações Rápidas */}
      <QuickActions actions={quickActions} />

      {/* Transações Recentes e Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionList transactions={recentTransactions.length > 0 ? recentTransactions : mockTransactions} />
        <div className="space-y-6">
          {/* Gráfico de Receitas vs Despesas */}
          <Chart
            title="Receitas vs Despesas"
            data={[
              { label: 'Receitas', value: monthlyStats.income, color: 'var(--color-success)' },
              { label: 'Despesas', value: monthlyStats.expense, color: 'var(--color-error)' },
            ]}
            type="bar"
            height={150}
          />
          {/* Gráfico de Categorias */}
          {transactions.length > 0 && (
            <Chart
              title="Gastos por Categoria"
              data={useMemo(() => {
                const categoryTotals = transactions
                  .filter(t => t.type === 'expense')
                  .reduce((acc, t) => {
                    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount)
                    return acc
                  }, {} as Record<string, number>)
                
                return Object.entries(categoryTotals)
                  .map(([category, total]) => ({
                    label: category,
                    value: total,
                  }))
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 5)
              }, [transactions])}
              type="pie"
              height={200}
            />
          )}
        </div>
      </div>
    </div>
  )
}
