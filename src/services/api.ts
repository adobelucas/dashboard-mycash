import { supabase } from './supabase'
import type { Transaction, Card, User } from '@/types'

// ============================================
// TRANSACTIONS API
// ============================================

export const transactionsApi = {
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (error) throw error
    return data as Transaction[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Transaction
  },

  async create(transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select()
      .single()

    if (error) throw error
    return data as Transaction
  },

  async update(id: string, updates: Partial<Transaction>) {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Transaction
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('transactions')
      .eq('id', id)
      .delete()

    if (error) throw error
  },
}

// ============================================
// CARDS API
// ============================================

export const cardsApi = {
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Card[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Card
  },

  async create(card: Omit<Card, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('cards')
      .insert([card])
      .select()
      .single()

    if (error) throw error
    return data as Card
  },

  async update(id: string, updates: Partial<Card>) {
    const { data, error } = await supabase
      .from('cards')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Card
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('cards')
      .eq('id', id)
      .delete()

    if (error) throw error
  },
}

// ============================================
// USER API
// ============================================

export const userApi = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data as User
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data as User
  },
}

// ============================================
// DASHBOARD STATS API
// ============================================

export const dashboardApi = {
  async getBalance(userId: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select('amount, type')
      .eq('user_id', userId)

    if (error) throw error

    const balance = data.reduce((acc, transaction) => {
      return acc + (transaction.type === 'income' ? transaction.amount : -transaction.amount)
    }, 0)

    return balance
  },

  async getMonthlyStats(userId: string, month: number, year: number) {
    const startDate = new Date(year, month, 1).toISOString()
    const endDate = new Date(year, month + 1, 0).toISOString()

    const { data, error } = await supabase
      .from('transactions')
      .select('amount, type')
      .eq('user_id', userId)
      .gte('date', startDate)
      .lte('date', endDate)

    if (error) throw error

    const income = data
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0)

    const expense = data
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + Math.abs(t.amount), 0)

    return {
      income,
      expense,
      savings: income - expense,
    }
  },
}
