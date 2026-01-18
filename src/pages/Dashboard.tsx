import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BalanceCard,
  SummaryCard,
  QuickActions,
  Chart,
  CategoryCard,
  CardsAccountsSection,
  UpcomingExpensesSection,
  DetailedStatement,
  type QuickAction,
  type CardAccount,
  type UpcomingExpense,
  type DetailedStatementTransaction,
} from '@/components/dashboard'
import { Loading } from '@/components/ui'
import { useApp } from '@/contexts'

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { transactions, balance, isLoading } = useApp()
  const [statementSearchQuery, setStatementSearchQuery] = useState('')
  const [statementFilterType, setStatementFilterType] = useState('expense')
  const [statementPage, setStatementPage] = useState(1)

  // Dados mockados conforme Figma
  const categoryCards = useMemo(() => [
    { category: 'Aluguel', percentage: 25, amount: 4000 },
    { category: 'Alimentação', percentage: 15, amount: 2000 },
    { category: 'Mercado', percentage: 5, amount: 1500 },
    { category: 'Academia', percentage: 3, amount: 120 },
  ], [])

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

    return { income: income || 12000, expense: expense || 10000 }
  }, [transactions])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  // Dados mockados para Cards & Contas
  const mockAccounts: CardAccount[] = useMemo(() => [
    { id: '1', name: 'Nubank', balance: 120, dueDay: 10, lastDigits: '5897' },
    { id: '2', name: 'Inter', balance: 2300, dueDay: 21, lastDigits: '5897' },
    { id: '3', name: 'Picpay', balance: 17000, dueDay: 12, lastDigits: '5897' },
  ], [])

  // Dados mockados para Próximas despesas
  const mockUpcomingExpenses: UpcomingExpense[] = useMemo(() => {
    const now = new Date()
    const dueDate = new Date(now.getFullYear(), now.getMonth(), 21)
    return Array.from({ length: 5 }, (_, i) => ({
      id: `upcoming-${i + 1}`,
      description: 'Conta de Luz',
      amount: 154,
      dueDate: dueDate.toISOString(),
      card: 'Crédito Nubank',
      cardLastDigits: '5897',
    }))
  }, [])

  // Dados para gráfico Fluxo financeiro (12 meses)
  const monthlyFlowData = useMemo(() => {
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
    return months.map((month, index) => ({
      label: month,
      income: 8000 + (index * 500),
      expense: 7000 + (index * 400),
    }))
  }, [])

  // Dados mockados para Extrato detalhado
  const mockDetailedTransactions: DetailedStatementTransaction[] = useMemo(() => [
    {
      id: '1',
      member: { id: '1', name: 'Membro 1' },
      date: new Date(2026, 0, 17).toISOString(),
      description: 'Conta de água',
      category: 'Manutenção',
      account: 'Conta corrente',
      installments: '-',
      amount: 100,
      type: 'expense',
    },
    {
      id: '2',
      member: { id: '2', name: 'Membro 2' },
      date: new Date(2026, 0, 17).toISOString(),
      description: 'Conta de Luz',
      category: 'Manutenção',
      account: 'Conta corrente',
      installments: '-',
      amount: 150,
      type: 'expense',
    },
    {
      id: '3',
      member: { id: '3', name: 'Membro 3' },
      date: new Date(2026, 0, 17).toISOString(),
      description: 'Passeio no parque',
      category: 'Lazer',
      account: 'Cartão XP',
      installments: '1/1',
      amount: 750,
      type: 'expense',
    },
  ], [])

  // Filtrar transações do extrato detalhado
  const filteredDetailedTransactions = useMemo(() => {
    let filtered = mockDetailedTransactions

    if (statementFilterType !== 'all') {
      filtered = filtered.filter(t => t.type === statementFilterType)
    }

    if (statementSearchQuery) {
      const query = statementSearchQuery.toLowerCase()
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [mockDetailedTransactions, statementFilterType, statementSearchQuery])

  const totalDetailedItems = filteredDetailedTransactions.length

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

      {/* Cards de Categorias (linha superior) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryCards.map((category) => (
          <CategoryCard
            key={category.category}
            category={category.category}
            percentage={category.percentage}
            amount={category.amount}
          />
        ))}
      </div>

      {/* Cards principais (Saldo, Receitas, Despesas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BalanceCard
          title="Saldo total"
          amount={balance || 2000}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <SummaryCard
          title="Receitas"
          value={formatCurrency(monthlyStats.income)}
          variant="success"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <SummaryCard
          title="Despesas"
          value={formatCurrency(monthlyStats.expense)}
          variant="error"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          }
        />
      </div>

      {/* Ações Rápidas */}
      <QuickActions actions={quickActions} />

      {/* Layout 2 colunas: Gráfico Fluxo financeiro (esquerda) + Cards & contas + Próximas despesas (direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico Fluxo financeiro */}
        <div>
          <Chart
            title="Fluxo financeiro"
            data={monthlyFlowData.flatMap((month) => [
              { label: `${month.label} - Receitas`, value: month.income, color: 'var(--color-success)' },
              { label: `${month.label} - Despesas`, value: month.expense, color: 'var(--color-error)' },
            ])}
            type="line"
            height={250}
          />
        </div>

        {/* Cards & contas + Próximas despesas */}
        <div className="space-y-6">
          <CardsAccountsSection
            accounts={mockAccounts}
            onAdd={() => navigate('/cards')}
            onViewAll={() => navigate('/cards')}
          />
          <UpcomingExpensesSection
            expenses={mockUpcomingExpenses}
            onAdd={() => navigate('/transactions')}
          />
        </div>
      </div>

      {/* Extrato detalhado */}
      <DetailedStatement
        transactions={filteredDetailedTransactions}
        searchQuery={statementSearchQuery}
        onSearchChange={setStatementSearchQuery}
        filterType={statementFilterType}
        onFilterTypeChange={setStatementFilterType}
        currentPage={statementPage}
        totalPages={Math.ceil(totalDetailedItems / 5)}
        totalItems={totalDetailedItems}
        onPageChange={setStatementPage}
      />
    </div>
  )
}
