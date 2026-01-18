import { useState, useEffect } from 'react'
import { cardsApi } from '@/services/api'
import type { Card } from '@/types'

export function useCards(userId?: string) {
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    const loadCards = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await cardsApi.getAll(userId)
        setCards(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar cartões')
      } finally {
        setIsLoading(false)
      }
    }

    loadCards()
  }, [userId])

  const refresh = async () => {
    if (!userId) return
    try {
      const data = await cardsApi.getAll(userId)
      setCards(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar cartões')
    }
  }

  return {
    cards,
    isLoading,
    error,
    refresh,
  }
}
