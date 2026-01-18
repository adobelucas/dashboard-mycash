import React, { useState } from 'react'
import { CardList, CardForm } from '@/components/cards'
import { Loading, Modal, ConfirmDialog, useToast } from '@/components/ui'
import { useApp } from '@/contexts'
import { accountsApi } from '@/services/api'
import type { Account } from '@/types'

export const Cards: React.FC = () => {
  const { accounts, isLoading, user, refreshAccounts } = useApp()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCard, setEditingCard] = useState<Account | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; card: Account | null }>({
    isOpen: false,
    card: null,
  })
  const { showToast } = useToast()

  const handleCardClick = (cardId: string) => {
    const card = accounts.find(c => c.id === cardId)
    if (card) {
      setEditingCard(card)
      setIsModalOpen(true)
    }
  }

  const handleAddCard = () => {
    setEditingCard(null)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return <Loading fullScreen message="Carregando cartões..." />
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Cartões
        </h1>
        <p className="text-sm text-text-secondary">
          Gerencie seus cartões de crédito e débito
        </p>
      </div>

      {/* Lista de Cartões */}
      <CardList
        cards={accounts.map(acc => ({
          id: acc.id,
          name: acc.name,
          number: acc.lastDigits || '0000',
          type: acc.type === 'CREDIT_CARD' ? 'credit' : 'debit',
          brand: 'visa',
          limit: acc.creditLimit,
          availableLimit: acc.creditLimit ? (acc.creditLimit - (acc.currentBill || 0)) : undefined,
        }))}
        onCardClick={handleCardClick}
        onAddCard={handleAddCard}
        onCardDelete={(cardId) => {
          const card = accounts.find(c => c.id === cardId)
          if (card) {
            setDeleteConfirm({ isOpen: true, card })
          }
        }}
      />

      {/* Modal de Cartão */}
      {user && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingCard(null)
          }}
          title={editingCard ? 'Editar Cartão' : 'Novo Cartão'}
          size="md"
        >
          <CardForm
            card={editingCard ? {
              id: editingCard.id,
              name: editingCard.name,
              number: editingCard.lastDigits || '0000',
              type: editingCard.type === 'CREDIT_CARD' ? 'credit' : 'debit',
              brand: 'visa',
              limit: editingCard.creditLimit,
              availableLimit: editingCard.creditLimit ? (editingCard.creditLimit - (editingCard.currentBill || 0)) : undefined,
              userId: editingCard.userId,
              createdAt: editingCard.createdAt,
              updatedAt: editingCard.updatedAt,
            } : undefined}
            userId={user.id}
            onSuccess={() => {
              setIsModalOpen(false)
              setEditingCard(null)
              refreshAccounts()
            }}
            onCancel={() => {
              setIsModalOpen(false)
              setEditingCard(null)
            }}
          />
        </Modal>
      )}

      {/* Dialog de Confirmação de Exclusão */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, card: null })}
        onConfirm={async () => {
          if (deleteConfirm.card) {
            try {
              await accountsApi.delete(deleteConfirm.card.id)
              showToast('Conta excluída com sucesso!', 'success')
              await refreshAccounts()
              setDeleteConfirm({ isOpen: false, card: null })
            } catch (error) {
              console.error('Error deleting card:', error)
              showToast('Erro ao excluir cartão', 'error')
            }
          }
        }}
        title="Excluir Cartão"
        message="Tem certeza que deseja excluir este cartão? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        variant="danger"
      />
    </div>
  )
}
