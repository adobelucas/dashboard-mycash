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

  // Carregar usuário atual
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser) {
          const userData = await userApi.getProfile(authUser.id)
          setUser(userData)
        }
      } catch (err) {
        console.error('Error loading user:', err)
        setError('Erro ao carregar usuário')
      }
    }

    loadUser()

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          const userData = await userApi.getProfile(session.user.id)
          setUser(userData)
        } catch (err) {
          console.error('Error loading user:', err)
        }
      } else {
        setUser(null)
        setTransactions([])
        setCards([])
        setBalance(0)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Carregar dados quando usuário estiver disponível
  useEffect(() => {
    if (user) {
      refreshAll()
    } else {
      setIsLoading(false)
    }
  }, [user])

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
