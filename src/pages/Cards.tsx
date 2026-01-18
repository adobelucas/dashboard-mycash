import React, { useState } from 'react'
import { CardList, CardForm } from '@/components/cards'
import { Loading, Modal, ConfirmDialog, useToast } from '@/components/ui'
import { useApp } from '@/contexts'
import { cardsApi } from '@/services/api'

// Dados mockados para fallback
const mockCards = [
  {
    id: '1',
    name: 'Cartão Principal',
    number: '1234',
    type: 'credit' as const,
    brand: 'visa' as const,
    limit: 5000,
    availableLimit: 3500,
  },
  {
    id: '2',
    name: 'Cartão de Débito',
    number: '5678',
    type: 'debit' as const,
    brand: 'mastercard' as const,
  },
]

export const Cards: React.FC = () => {
  const { cards, isLoading, user, refreshCards } = useApp()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCard, setEditingCard] = useState<typeof cards[0] | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; card: typeof cards[0] | null }>({
    isOpen: false,
    card: null,
  })
  const { showToast } = useToast()

  const handleCardClick = (cardId: string) => {
    const card = cards.find(c => c.id === cardId)
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
        cards={cards.length > 0 ? cards : mockCards}
        onCardClick={handleCardClick}
        onAddCard={handleAddCard}
        onCardDelete={(cardId) => {
          const card = cards.find(c => c.id === cardId)
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
            card={editingCard || undefined}
            userId={user.id}
            onSuccess={() => {
              setIsModalOpen(false)
              setEditingCard(null)
              refreshCards()
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
              await cardsApi.delete(deleteConfirm.card.id)
              showToast('Cartão excluído com sucesso!', 'success')
              await refreshCards()
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
