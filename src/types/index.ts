// Tipos base do projeto - Mycash+ v2.0
// Baseado no schema Prisma fornecido

// ============================================
// ENUMS
// ============================================

export type TransactionType = 'INCOME' | 'EXPENSE'
export type AccountType = 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD'
export type RecurrenceFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
export type TransactionStatus = 'PENDING' | 'COMPLETED'

// ============================================
// USER
// ============================================

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

// ============================================
// FAMILY MEMBER
// ============================================

export interface FamilyMember {
  id: string
  userId: string
  name: string
  role: string
  avatar?: string
  monthlyIncome: number
  color: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// ============================================
// CATEGORY
// ============================================

export interface Category {
  id: string
  userId: string
  name: string
  icon: string
  type: TransactionType
  color: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// ============================================
// ACCOUNT (Unifica contas e cartões)
// ============================================

export interface Account {
  id: string
  userId: string
  type: AccountType
  name: string
  bank: string
  lastDigits?: string
  holderId: string
  
  // Campos para CHECKING e SAVINGS
  balance: number
  
  // Campos para CREDIT_CARD
  creditLimit?: number
  currentBill?: number
  dueDay?: number
  closingDay?: number
  theme?: string
  logoUrl?: string
  
  color: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// ============================================
// TRANSACTION
// ============================================

export interface Transaction {
  id: string
  userId: string
  type: TransactionType
  amount: number
  description: string
  date: string
  categoryId?: string
  accountId?: string
  memberId?: string
  
  // Parcelamento
  installmentNumber?: number
  totalInstallments: number
  parentTransactionId?: string
  
  // Recorrência
  isRecurring: boolean
  recurringTransactionId?: string
  
  // Status
  status: TransactionStatus
  notes?: string
  
  createdAt: string
  updatedAt: string
}

// ============================================
// RECURRING TRANSACTION
// ============================================

export interface RecurringTransaction {
  id: string
  userId: string
  type: TransactionType
  amount: number
  description: string
  categoryId?: string
  accountId?: string
  memberId?: string
  
  // Configuração de recorrência
  frequency: RecurrenceFrequency
  dayOfMonth?: number
  dayOfWeek?: number
  startDate: string
  endDate?: string
  
  isActive: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

// ============================================
// TIPOS LEGACY (para compatibilidade)
// ============================================

// Card mantido para compatibilidade durante migração
// Será substituído por Account
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
