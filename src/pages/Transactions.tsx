import React, { useState, useMemo } from 'react'
import { TransactionList, TransactionFilters, TransactionForm, SearchInput, ExportButton } from '@/components/transactions'
import { Button, Loading, Modal, ConfirmDialog, useToast } from '@/components/ui'
import { useApp } from '@/contexts'
import { transactionsApi } from '@/services/api'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Transaction } from '@/types'

export const Transactions: React.FC = () => {
  const { transactions, categories: categoriesContext, isLoading, user, refreshTransactions } = useApp()
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

  // Extrair nomes de categorias para filtro
  const categoryNames = useMemo(() => {
    return categoriesContext
      .filter(c => c.isActive)
      .map(c => c.name)
      .sort()
  }, [categoriesContext])

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Converter type para comparação
      const transactionType = transaction.type === 'INCOME' ? 'income' : 'expense'
      const typeMatch = selectedType === 'all' || transactionType === selectedType
      
      // Buscar nome da categoria
      const category = transaction.categoryId 
        ? categoriesContext.find(c => c.id === transaction.categoryId)?.name || ''
        : ''
      const categoryMatch = !selectedCategory || category === selectedCategory
      
      const searchMatch = !searchQuery || 
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.toLowerCase().includes(searchQuery.toLowerCase())
      
      return typeMatch && categoryMatch && searchMatch
    })
  }, [transactions, categoriesContext, selectedType, selectedCategory, searchQuery])

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
        categories={categoryNames.length > 0 ? categoryNames : []}
      />

      {/* Lista de Transações */}
      <TransactionList
        transactions={displayedItems.map(t => {
          const category = t.categoryId 
            ? categoriesContext.find(c => c.id === t.categoryId)?.name || 'Sem categoria'
            : 'Sem categoria'
          
          return {
            id: t.id,
            description: t.description,
            amount: t.amount,
            type: t.type === 'INCOME' ? 'income' : 'expense',
            category,
            date: t.date,
          }
        })}
        title={`${filteredTransactions.length} transações encontradas`}
        onTransactionClick={(transaction) => {
          const fullTransaction = displayedItems.find(t => t.id === transaction.id)
          if (fullTransaction) {
            setEditingTransaction(fullTransaction)
            setIsModalOpen(true)
          }
        }}
        onTransactionDelete={(transaction) => {
          const fullTransaction = displayedItems.find(t => t.id === transaction.id)
          if (fullTransaction) {
            setDeleteConfirm({ isOpen: true, transaction: fullTransaction })
          }
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
