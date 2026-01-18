import React from 'react'
import { CardItem } from './CardItem'
import type { CardItemProps } from './CardItem'
import { Button } from '@/components/ui'

export interface CardListProps {
  cards: Omit<CardItemProps, 'onClick'>[]
  onCardClick?: (cardId: string) => void
  onAddCard?: () => void
  onCardDelete?: (cardId: string) => void
}

export const CardList: React.FC<CardListProps> = ({
  cards,
  onCardClick,
  onAddCard,
  onCardDelete,
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">
            Meus Cartões
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            {cards.length} {cards.length === 1 ? 'cartão' : 'cartões'}
          </p>
        </div>
        {onAddCard && (
          <Button variant="primary" size="sm" onClick={onAddCard}>
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
            Adicionar
          </Button>
        )}
      </div>

      {cards.length === 0 ? (
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
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <p className="text-text-secondary mb-4">Nenhum cartão cadastrado</p>
          {onAddCard && (
            <Button variant="outline" onClick={onAddCard}>
              Adicionar primeiro cartão
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <CardItem
              key={card.id}
              {...card}
              onClick={() => onCardClick?.(card.id)}
              onDelete={onCardDelete ? () => onCardDelete(card.id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}
