import React, { useState, useMemo } from 'react'
import { TransactionList, TransactionFilters, TransactionForm, SearchInput, ExportButton } from '@/components/transactions'
import { Button, Loading, Modal, ConfirmDialog, useToast } from '@/components/ui'
import { useApp } from '@/contexts'
import { transactionsApi } from '@/services/api'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Transaction } from '@/types'

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
  {
    id: '4',
    description: 'Freelance',
    amount: 1200,
    type: 'income' as const,
    category: 'Trabalho',
    date: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: '5',
    description: 'Restaurante',
    amount: -85.00,
    type: 'expense' as const,
    category: 'Alimentação',
    date: new Date(Date.now() - 345600000).toISOString(),
  },
]

export const Transactions: React.FC = () => {
  const { transactions, isLoading, user, refreshTransactions } = useApp()
  const [selectedType, setSelectedType] = useState<'all' | 'income' | 'expense'>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; transaction: Transaction | null }>({
    isOpen: false,
    transaction: null,
  })
  const { showToast } = useToast()

  const categories = useMemo(() => {
    const uniqueCategories = new Set(transactions.map(t => t.category))
    return Array.from(uniqueCategories).sort()
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    const dataToFilter: Transaction[] = transactions.length > 0 ? transactions : mockTransactions.map(t => ({
      ...t,
      userId: user?.id || '',
      createdAt: t.date,
      updatedAt: t.date,
    }))
    return dataToFilter.filter((transaction) => {
      const typeMatch = selectedType === 'all' || transaction.type === selectedType
      const categoryMatch = !selectedCategory || transaction.category === selectedCategory
      const searchMatch = !searchQuery || 
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
      return typeMatch && categoryMatch && searchMatch
    })
  }, [transactions, selectedType, selectedCategory, searchQuery])

  const { displayedItems, hasMore, loadMoreRef } = useInfiniteScroll(filteredTransactions, 10)

  if (isLoading) {
    return <Loading fullScreen message="Carregando transações..." />
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            Transações
          </h1>
          <p className="text-sm text-text-secondary">
            Gerencie suas receitas e despesas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButton transactions={filteredTransactions} />
          <Button variant="primary" size="md" onClick={() => {
            setEditingTransaction(null)
            setIsModalOpen(true)
          }}>
            <svg
              className="w-5 h-5 mr-2"
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
            Nova Transação
          </Button>
        </div>
      </div>

      {/* Busca */}
      <div className="mb-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar por descrição ou categoria..."
        />
      </div>

      {/* Filtros */}
      <TransactionFilters
        selectedType={selectedType}
        selectedCategory={selectedCategory}
        onTypeChange={setSelectedType}
        onCategoryChange={setSelectedCategory}
        categories={categories.length > 0 ? categories : ['Salário', 'Alimentação', 'Entretenimento', 'Trabalho', 'Transporte', 'Saúde', 'Educação', 'Moradia', 'Outros']}
      />

      {/* Lista de Transações */}
      <TransactionList
        transactions={displayedItems}
        title={`${filteredTransactions.length} transações encontradas`}
        onTransactionClick={(transaction) => {
          setEditingTransaction(transaction)
          setIsModalOpen(true)
        }}
        onTransactionDelete={(transaction) => {
          setDeleteConfirm({ isOpen: true, transaction })
        }}
      />

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-4">
          <Loading size="md" message="Carregando mais transações..." />
        </div>
      )}

      {/* Modal de Transação */}
      {user && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingTransaction(null)
          }}
          title={editingTransaction ? 'Editar Transação' : 'Nova Transação'}
          size="md"
        >
          <TransactionForm
            transaction={editingTransaction || undefined}
            userId={user.id}
            onSuccess={() => {
              setIsModalOpen(false)
              setEditingTransaction(null)
              refreshTransactions()
            }}
            onCancel={() => {
              setIsModalOpen(false)
              setEditingTransaction(null)
            }}
          />
        </Modal>
      )}

      {/* Dialog de Confirmação de Exclusão */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, transaction: null })}
        onConfirm={async () => {
          if (deleteConfirm.transaction) {
            try {
              await transactionsApi.delete(deleteConfirm.transaction.id)
              showToast('Transação excluída com sucesso!', 'success')
              await refreshTransactions()
              setDeleteConfirm({ isOpen: false, transaction: null })
            } catch (error) {
              console.error('Error deleting transaction:', error)
              showToast('Erro ao excluir transação', 'error')
            }
          }
        }}
        title="Excluir Transação"
        message="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        variant="danger"
      />
    </div>
  )
}
