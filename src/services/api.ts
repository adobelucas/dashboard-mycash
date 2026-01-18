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
    // Transformar de snake_case para camelCase
    return (data || []).map(item => ({
      id: item.id,
      type: item.type,
      amount: item.amount,
      description: item.description,
      category: item.category,
      date: item.date,
      userId: item.user_id,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    })) as Transaction[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    // Transformar de snake_case para camelCase
    return {
      id: data.id,
      type: data.type,
      amount: data.amount,
      description: data.description,
      category: data.category,
      date: data.date,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as Transaction
  },

  async create(transaction: {
    user_id: string
    type: 'income' | 'expense'
    amount: number
    description: string
    category: string
    date: string
  }) {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select()
      .single()

    if (error) throw error
    // Transformar de snake_case para camelCase
    const transformed = {
      id: data.id,
      type: data.type,
      amount: data.amount,
      description: data.description,
      category: data.category,
      date: data.date,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
    return transformed as Transaction
  },

  async update(id: string, updates: {
    user_id?: string
    type?: 'income' | 'expense'
    amount?: number
    description?: string
    category?: string
    date?: string
  }) {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    // Transformar de snake_case para camelCase
    const transformed = {
      id: data.id,
      type: data.type,
      amount: data.amount,
      description: data.description,
      category: data.category,
      date: data.date,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
    return transformed as Transaction
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)

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
    // Transformar de snake_case para camelCase
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      number: item.number,
      type: item.type,
      brand: item.brand,
      limit: item.limit,
      availableLimit: item.available_limit,
      userId: item.user_id,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    })) as Card[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    // Transformar de snake_case para camelCase
    return {
      id: data.id,
      name: data.name,
      number: data.number,
      type: data.type,
      brand: data.brand,
      limit: data.limit,
      availableLimit: data.available_limit,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as Card
  },

  async create(card: {
    user_id: string
    name: string
    number: string
    type: 'credit' | 'debit'
    brand: 'visa' | 'mastercard' | 'elo' | 'other'
    limit?: number
    available_limit?: number
  }) {
    const { data, error } = await supabase
      .from('cards')
      .insert([card])
      .select()
      .single()

    if (error) throw error
    // Transformar de snake_case para camelCase
    const transformed = {
      id: data.id,
      name: data.name,
      number: data.number,
      type: data.type,
      brand: data.brand,
      limit: data.limit,
      availableLimit: data.available_limit,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
    return transformed as Card
  },

  async update(id: string, updates: {
    user_id?: string
    name?: string
    number?: string
    type?: 'credit' | 'debit'
    brand?: 'visa' | 'mastercard' | 'elo' | 'other'
    limit?: number
    available_limit?: number
  }) {
    const { data, error } = await supabase
      .from('cards')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    // Transformar de snake_case para camelCase
    const transformed = {
      id: data.id,
      name: data.name,
      number: data.number,
      type: data.type,
      brand: data.brand,
      limit: data.limit,
      availableLimit: data.available_limit,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
    return transformed as Card
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', id)

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
