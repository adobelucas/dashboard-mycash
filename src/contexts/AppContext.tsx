import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User, Transaction, Account, Category, FamilyMember } from '@/types'
import { transactionsApi, accountsApi, dashboardApi, categoriesApi, familyMembersApi } from '@/services/api'
import { useAuth } from '@/hooks/useAuth'

interface AppContextType {
  user: User | null
  transactions: Transaction[]
  accounts: Account[]
  categories: Category[]
  familyMembers: FamilyMember[]
  balance: number
  isLoading: boolean
  error: string | null
  refreshTransactions: () => Promise<void>
  refreshAccounts: () => Promise<void>
  refreshCategories: () => Promise<void>
  refreshFamilyMembers: () => Promise<void>
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
  const { user: authUser, isLoading: authLoading } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [balance, setBalance] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Sincronizar usuário autenticado
  useEffect(() => {
    if (authUser) {
      setUser(authUser)
      setIsLoading(false)
    } else if (!authLoading) {
      setUser(null)
      setIsLoading(false)
    }
  }, [authUser, authLoading])

  // Carregar dados quando usuário estiver disponível
  useEffect(() => {
    if (user) {
      refreshAll()
    } else {
      // Limpar dados quando usuário não estiver autenticado
      setTransactions([])
      setAccounts([])
      setCategories([])
      setFamilyMembers([])
      setBalance(0)
    }
  }, [user?.id])

  const refreshTransactions = async () => {
    if (!user) return
    try {
      const data = await transactionsApi.getAll(user.id)
      setTransactions(data)
      setError(null)
    } catch (err) {
      console.error('Error loading transactions:', err)
      setError('Erro ao carregar transações')
    }
  }

  const refreshAccounts = async () => {
    if (!user) return
    try {
      const data = await accountsApi.getAll(user.id)
      setAccounts(data)
      setError(null)
    } catch (err) {
      console.error('Error loading accounts:', err)
      setError('Erro ao carregar contas')
    }
  }

  const refreshCategories = async () => {
    if (!user) return
    try {
      const data = await categoriesApi.getAll(user.id)
      setCategories(data)
      setError(null)
    } catch (err) {
      console.error('Error loading categories:', err)
      setError('Erro ao carregar categorias')
    }
  }

  const refreshFamilyMembers = async () => {
    if (!user) return
    try {
      const data = await familyMembersApi.getAll(user.id)
      setFamilyMembers(data)
      setError(null)
    } catch (err) {
      console.error('Error loading family members:', err)
      setError('Erro ao carregar membros da família')
    }
  }

  const refreshBalance = async () => {
    if (!user) return
    try {
      const balanceValue = await dashboardApi.getBalance(user.id)
      setBalance(balanceValue)
      setError(null)
    } catch (err) {
      console.error('Error loading balance:', err)
      setError('Erro ao carregar saldo')
    }
  }

  const refreshAll = async () => {
    if (!user) return
    
    setIsLoading(true)
    setError(null)
    try {
      await Promise.all([
        refreshTransactions(),
        refreshAccounts(),
        refreshCategories(),
        refreshFamilyMembers(),
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
        accounts,
        categories,
        familyMembers,
        balance,
        isLoading,
        error,
        refreshTransactions,
        refreshAccounts,
        refreshCategories,
        refreshFamilyMembers,
        refreshBalance,
        refreshAll,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
