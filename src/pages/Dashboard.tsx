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
  const { transactions, accounts, categories, familyMembers, balance, isLoading } = useApp()
  const [statementSearchQuery, setStatementSearchQuery] = useState('')
  const [statementFilterType, setStatementFilterType] = useState('expense')
  const [statementPage, setStatementPage] = useState(1)

  // Calcular top categorias a partir de transações reais
  const categoryCards = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date)
      return date.getMonth() === currentMonth && 
             date.getFullYear() === currentYear &&
             t.type === 'EXPENSE' &&
             t.status === 'COMPLETED'
    })

    const categoryTotals = new Map<string, number>()
    monthTransactions.forEach(t => {
      if (t.categoryId) {
        const categoryName = categories.find(c => c.id === t.categoryId)?.name || 'Sem categoria'
        const current = categoryTotals.get(categoryName) || 0
        categoryTotals.set(categoryName, current + Math.abs(t.amount))
      }
    })

    const totalExpenses = Array.from(categoryTotals.values()).reduce((acc, val) => acc + val, 0)
    const sortedCategories = Array.from(categoryTotals.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([name, amount]) => ({
        category: name,
        amount,
        percentage: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0,
      }))

    return sortedCategories
  }, [transactions, categories])

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
      .filter(t => t.type === 'INCOME' && t.status === 'COMPLETED')
      .reduce((acc, t) => acc + t.amount, 0)

    const expense = monthTransactions
      .filter(t => t.type === 'EXPENSE' && t.status === 'COMPLETED')
      .reduce((acc, t) => acc + Math.abs(t.amount), 0)

    return { income, expense, savings: income - expense }
  }, [transactions])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  // Converter accounts para CardAccount
  const cardAccounts: CardAccount[] = useMemo(() => {
    return accounts
      .filter(a => a.isActive)
      .slice(0, 3)
      .map(a => ({
        id: a.id,
        name: a.name,
        balance: a.balance,
        dueDay: a.dueDay || 0,
        lastDigits: a.lastDigits || '0000',
      }))
  }, [accounts])

  // Calcular próximas despesas a partir de transações PENDING ou futuras
  const upcomingExpenses: UpcomingExpense[] = useMemo(() => {
    const now = new Date()
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    const pendingOrFuture = transactions
      .filter(t => 
        t.type === 'EXPENSE' && (
          t.status === 'PENDING' ||
          (new Date(t.date) >= now && new Date(t.date) <= nextMonth)
        )
      )
      .slice(0, 5)
      .map(t => {
        const account = accounts.find(a => a.id === t.accountId)
        return {
          id: t.id,
          description: t.description,
          amount: Math.abs(t.amount),
          dueDate: t.date,
          card: account?.name || 'Conta',
          cardLastDigits: account?.lastDigits || '0000',
        }
      })

    return pendingOrFuture
  }, [transactions, accounts])

  // Calcular dados para gráfico Fluxo financeiro a partir de transações reais
  const monthlyFlowData = useMemo(() => {
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
    const currentYear = new Date().getFullYear()

    return {
      labels: months,
      income: months.map((_, index) => {
        const monthTransactions = transactions.filter(t => {
          const date = new Date(t.date)
          return date.getMonth() === index &&
                 date.getFullYear() === currentYear &&
                 t.type === 'INCOME' &&
                 t.status === 'COMPLETED'
        })
        return monthTransactions.reduce((acc, t) => acc + t.amount, 0)
      }),
      expense: months.map((_, index) => {
        const monthTransactions = transactions.filter(t => {
          const date = new Date(t.date)
          return date.getMonth() === index &&
                 date.getFullYear() === currentYear &&
                 t.type === 'EXPENSE' &&
                 t.status === 'COMPLETED'
        })
        return monthTransactions.reduce((acc, t) => acc + Math.abs(t.amount), 0)
      }),
    }
  }, [transactions])

  // Converter transactions para DetailedStatementTransaction
  const detailedTransactions: DetailedStatementTransaction[] = useMemo(() => {
    return transactions
      .filter(t => t.status === 'COMPLETED')
      .map(t => {
        const member = t.memberId ? familyMembers.find(m => m.id === t.memberId) : null
        const category = t.categoryId ? categories.find(c => c.id === t.categoryId) : null
        const account = t.accountId ? accounts.find(a => a.id === t.accountId) : null

        return {
          id: t.id,
          member: {
            id: member?.id || 'unknown',
            name: member?.name || 'Sem membro',
            avatar: member?.avatar,
          },
          date: t.date,
          description: t.description,
          category: category?.name || 'Sem categoria',
          account: account?.name || 'Sem conta',
          installments: t.totalInstallments > 1 
            ? `${t.installmentNumber || 1}/${t.totalInstallments}`
            : '-',
          amount: Math.abs(t.amount),
          type: t.type === 'INCOME' ? 'income' : 'expense',
        }
      })
  }, [transactions, familyMembers, categories, accounts])

  // Filtrar transações do extrato detalhado
  const filteredDetailedTransactions = useMemo(() => {
    let filtered = detailedTransactions

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
  }, [detailedTransactions, statementFilterType, statementSearchQuery])

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
          amount={balance}
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
            data={[]}
            type="area"
            height={250}
            areaSeries={[
              {
                label: 'Receitas',
                data: monthlyFlowData.income,
                color: '#84cc16', // lime-500 (amarelo-verde do Figma)
              },
              {
                label: 'Despesas',
                data: monthlyFlowData.expense,
                color: '#ef4444', // red-500 (vermelho do Figma)
              },
            ]}
            areaLabels={monthlyFlowData.labels}
            areaMaxValue={17500}
          />
        </div>

        {/* Cards & contas + Próximas despesas */}
        <div className="space-y-6">
          <CardsAccountsSection
            accounts={cardAccounts}
            onAdd={() => navigate('/cards')}
            onViewAll={() => navigate('/cards')}
          />
          <UpcomingExpensesSection
            expenses={upcomingExpenses}
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
