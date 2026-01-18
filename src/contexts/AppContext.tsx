import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/services/supabase'
import type { User, Transaction, Card } from '@/types'
import { transactionsApi, cardsApi, userApi, dashboardApi } from '@/services/api'

interface AppContextType {
  user: User | null
  transactions: Transaction[]
  cards: Card[]
  balance: number
  isLoading: boolean
  error: string | null
  refreshTransactions: () => Promise<void>
  refreshCards: () => Promise<void>
  refreshBalance: () => Promise<void>
  refreshAll: () => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [balance, setBalance] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Inicializar sem autenticação (modo demo/mock)
  useEffect(() => {
    // Definir um usuário mock ou vazio para trabalhar sem autenticação
    setUser({
      id: 'demo-user',
      name: 'Usuário Demo',
      email: 'demo@mycash.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    
    // Carregar dados mockados ou do Supabase sem autenticação
    setIsLoading(false)
  }, [])

  const refreshTransactions = async () => {
    if (!user) return
    try {
      const data = await transactionsApi.getAll(user.id)
      setTransactions(data)
    } catch (err) {
      console.error('Error loading transactions:', err)
      setError('Erro ao carregar transações')
    }
  }

  const refreshCards = async () => {
    if (!user) return
    try {
      const data = await cardsApi.getAll(user.id)
      setCards(data)
    } catch (err) {
      console.error('Error loading cards:', err)
      setError('Erro ao carregar cartões')
    }
  }

  const refreshBalance = async () => {
    if (!user) return
    try {
      const balanceValue = await dashboardApi.getBalance(user.id)
      setBalance(balanceValue)
    } catch (err) {
      console.error('Error loading balance:', err)
      setError('Erro ao carregar saldo')
    }
  }

  const refreshAll = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await Promise.all([
        refreshTransactions(),
        refreshCards(),
        refreshBalance(),
      ])
    } catch (err) {
      console.error('Error refreshing data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AppContext.Provider
      value={{
        user,
        transactions,
        cards,
        balance,
        isLoading,
        error,
        refreshTransactions,
        refreshCards,
        refreshBalance,
        refreshAll,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
