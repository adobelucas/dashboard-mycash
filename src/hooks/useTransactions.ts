import { useState, useEffect } from 'react'
import { transactionsApi } from '@/services/api'
import type { Transaction } from '@/types'

export function useTransactions(userId?: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    const loadTransactions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await transactionsApi.getAll(userId)
        setTransactions(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar transações')
      } finally {
        setIsLoading(false)
      }
    }

    loadTransactions()
  }, [userId])

  const refresh = async () => {
    if (!userId) return
    try {
      const data = await transactionsApi.getAll(userId)
      setTransactions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar transações')
    }
  }

  return {
    transactions,
    isLoading,
    error,
    refresh,
  }
}
