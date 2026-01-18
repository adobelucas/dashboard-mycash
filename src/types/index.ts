// Tipos base do projeto

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  description: string
  category: string
  date: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface Card {
  id: string
  name: string
  number: string
  type: 'credit' | 'debit'
  brand: 'visa' | 'mastercard' | 'elo' | 'other'
  limit?: number
  availableLimit?: number
  userId: string
  createdAt: string
  updatedAt: string
}
