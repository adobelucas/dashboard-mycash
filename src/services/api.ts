import { supabase } from './supabase'
import type { Transaction, Account, User, FamilyMember, Category, RecurringTransaction, TransactionType, AccountType, TransactionStatus } from '@/types'

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
      type: item.type as TransactionType,
      amount: Number(item.amount),
      description: item.description,
      date: item.date,
      categoryId: item.category_id || undefined,
      accountId: item.account_id || undefined,
      memberId: item.member_id || undefined,
      installmentNumber: item.installment_number || undefined,
      totalInstallments: item.total_installments || 1,
      parentTransactionId: item.parent_transaction_id || undefined,
      isRecurring: item.is_recurring || false,
      recurringTransactionId: item.recurring_transaction_id || undefined,
      status: item.status as TransactionStatus,
      notes: item.notes || undefined,
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
      type: data.type as TransactionType,
      amount: Number(data.amount),
      description: data.description,
      date: data.date,
      categoryId: data.category_id || undefined,
      accountId: data.account_id || undefined,
      memberId: data.member_id || undefined,
      installmentNumber: data.installment_number || undefined,
      totalInstallments: data.total_installments || 1,
      parentTransactionId: data.parent_transaction_id || undefined,
      isRecurring: data.is_recurring || false,
      recurringTransactionId: data.recurring_transaction_id || undefined,
      status: data.status as TransactionStatus,
      notes: data.notes || undefined,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as Transaction
  },

  async create(transaction: {
    user_id: string
    type: TransactionType
    amount: number
    description: string
    date: string
    category_id?: string | null
    account_id?: string | null
    member_id?: string | null
    installment_number?: number | null
    total_installments?: number
    parent_transaction_id?: string | null
    is_recurring?: boolean
    recurring_transaction_id?: string | null
    status?: TransactionStatus
    notes?: string | null
  }) {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select()
      .single()

    if (error) throw error
    // Transformar de snake_case para camelCase
    return {
      id: data.id,
      type: data.type as TransactionType,
      amount: Number(data.amount),
      description: data.description,
      date: data.date,
      categoryId: data.category_id || undefined,
      accountId: data.account_id || undefined,
      memberId: data.member_id || undefined,
      installmentNumber: data.installment_number || undefined,
      totalInstallments: data.total_installments || 1,
      parentTransactionId: data.parent_transaction_id || undefined,
      isRecurring: data.is_recurring || false,
      recurringTransactionId: data.recurring_transaction_id || undefined,
      status: data.status as TransactionStatus,
      notes: data.notes || undefined,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as Transaction
  },

  async update(id: string, updates: {
    type?: TransactionType
    amount?: number
    description?: string
    date?: string
    category_id?: string | null
    account_id?: string | null
    member_id?: string | null
    installment_number?: number | null
    total_installments?: number
    parent_transaction_id?: string | null
    is_recurring?: boolean
    recurring_transaction_id?: string | null
    status?: TransactionStatus
    notes?: string | null
  }) {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    // Transformar de snake_case para camelCase
    return {
      id: data.id,
      type: data.type as TransactionType,
      amount: Number(data.amount),
      description: data.description,
      date: data.date,
      categoryId: data.category_id || undefined,
      accountId: data.account_id || undefined,
      memberId: data.member_id || undefined,
      installmentNumber: data.installment_number || undefined,
      totalInstallments: data.total_installments || 1,
      parentTransactionId: data.parent_transaction_id || undefined,
      isRecurring: data.is_recurring || false,
      recurringTransactionId: data.recurring_transaction_id || undefined,
      status: data.status as TransactionStatus,
      notes: data.notes || undefined,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as Transaction
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
// ACCOUNTS API (substitui CARDS API)
// ============================================

export const accountsApi = {
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    // Transformar de snake_case para camelCase
    return (data || []).map(item => ({
      id: item.id,
      type: item.type as AccountType,
      name: item.name,
      bank: item.bank,
      lastDigits: item.last_digits || undefined,
      holderId: item.holder_id,
      balance: Number(item.balance),
      creditLimit: item.credit_limit ? Number(item.credit_limit) : undefined,
      currentBill: item.current_bill ? Number(item.current_bill) : undefined,
      dueDay: item.due_day || undefined,
      closingDay: item.closing_day || undefined,
      theme: item.theme || undefined,
      logoUrl: item.logo_url || undefined,
      color: item.color,
      isActive: item.is_active,
      userId: item.user_id,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    })) as Account[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    // Transformar de snake_case para camelCase
    return {
      id: data.id,
      type: data.type as AccountType,
      name: data.name,
      bank: data.bank,
      lastDigits: data.last_digits || undefined,
      holderId: data.holder_id,
      balance: Number(data.balance),
      creditLimit: data.credit_limit ? Number(data.credit_limit) : undefined,
      currentBill: data.current_bill ? Number(data.current_bill) : undefined,
      dueDay: data.due_day || undefined,
      closingDay: data.closing_day || undefined,
      theme: data.theme || undefined,
      logoUrl: data.logo_url || undefined,
      color: data.color,
      isActive: data.is_active,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as Account
  },

  async create(account: {
    user_id: string
    type: AccountType
    name: string
    bank: string
    last_digits?: string | null
    holder_id: string
    balance?: number
    credit_limit?: number | null
    current_bill?: number
    due_day?: number | null
    closing_day?: number | null
    theme?: string | null
    logo_url?: string | null
    color?: string
    is_active?: boolean
  }) {
    const { data, error } = await supabase
      .from('accounts')
      .insert([account])
      .select()
      .single()

    if (error) throw error
    // Transformar de snake_case para camelCase
    return {
      id: data.id,
      type: data.type as AccountType,
      name: data.name,
      bank: data.bank,
      lastDigits: data.last_digits || undefined,
      holderId: data.holder_id,
      balance: Number(data.balance),
      creditLimit: data.credit_limit ? Number(data.credit_limit) : undefined,
      currentBill: data.current_bill ? Number(data.current_bill) : undefined,
      dueDay: data.due_day || undefined,
      closingDay: data.closing_day || undefined,
      theme: data.theme || undefined,
      logoUrl: data.logo_url || undefined,
      color: data.color,
      isActive: data.is_active,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as Account
  },

  async update(id: string, updates: {
    type?: AccountType
    name?: string
    bank?: string
    last_digits?: string | null
    holder_id?: string
    balance?: number
    credit_limit?: number | null
    current_bill?: number
    due_day?: number | null
    closing_day?: number | null
    theme?: string | null
    logo_url?: string | null
    color?: string
    is_active?: boolean
  }) {
    const { data, error } = await supabase
      .from('accounts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    // Transformar de snake_case para camelCase
    return {
      id: data.id,
      type: data.type as AccountType,
      name: data.name,
      bank: data.bank,
      lastDigits: data.last_digits || undefined,
      holderId: data.holder_id,
      balance: Number(data.balance),
      creditLimit: data.credit_limit ? Number(data.credit_limit) : undefined,
      currentBill: data.current_bill ? Number(data.current_bill) : undefined,
      dueDay: data.due_day || undefined,
      closingDay: data.closing_day || undefined,
      theme: data.theme || undefined,
      logoUrl: data.logo_url || undefined,
      color: data.color,
      isActive: data.is_active,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as Account
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('accounts')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}

// ============================================
// FAMILY MEMBERS API
// ============================================

export const familyMembersApi = {
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from('family_members')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(item => ({
      id: item.id,
      userId: item.user_id,
      name: item.name,
      role: item.role,
      avatar: item.avatar_url || undefined,
      monthlyIncome: Number(item.monthly_income),
      color: item.color,
      isActive: item.is_active,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    })) as FamilyMember[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('family_members')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      role: data.role,
      avatar: data.avatar_url || undefined,
      monthlyIncome: Number(data.monthly_income),
      color: data.color,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as FamilyMember
  },

  async create(member: {
    user_id: string
    name: string
    role: string
    avatar_url?: string | null
    monthly_income?: number
    color?: string
    is_active?: boolean
  }) {
    const { data, error } = await supabase
      .from('family_members')
      .insert([member])
      .select()
      .single()

    if (error) throw error
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      role: data.role,
      avatar: data.avatar_url || undefined,
      monthlyIncome: Number(data.monthly_income),
      color: data.color,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as FamilyMember
  },

  async update(id: string, updates: {
    name?: string
    role?: string
    avatar_url?: string | null
    monthly_income?: number
    color?: string
    is_active?: boolean
  }) {
    const { data, error } = await supabase
      .from('family_members')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      role: data.role,
      avatar: data.avatar_url || undefined,
      monthlyIncome: Number(data.monthly_income),
      color: data.color,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as FamilyMember
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('family_members')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}

// ============================================
// CATEGORIES API
// ============================================

export const categoriesApi = {
  async getAll(userId: string, type?: TransactionType) {
    let query = supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)

    if (type) {
      query = query.eq('type', type)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(item => ({
      id: item.id,
      userId: item.user_id,
      name: item.name,
      icon: item.icon,
      type: item.type as TransactionType,
      color: item.color,
      isActive: item.is_active,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    })) as Category[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      icon: data.icon,
      type: data.type as TransactionType,
      color: data.color,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as Category
  },

  async create(category: {
    user_id: string
    name: string
    icon?: string
    type: TransactionType
    color?: string
    is_active?: boolean
  }) {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single()

    if (error) throw error
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      icon: data.icon,
      type: data.type as TransactionType,
      color: data.color,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as Category
  },

  async update(id: string, updates: {
    name?: string
    icon?: string
    type?: TransactionType
    color?: string
    is_active?: boolean
  }) {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      icon: data.icon,
      type: data.type as TransactionType,
      color: data.color,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as Category
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}

// ============================================
// RECURRING TRANSACTIONS API
// ============================================

export const recurringTransactionsApi = {
  async getAll(userId: string, isActive?: boolean) {
    let query = supabase
      .from('recurring_transactions')
      .select('*')
      .eq('user_id', userId)

    if (isActive !== undefined) {
      query = query.eq('is_active', isActive)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(item => ({
      id: item.id,
      userId: item.user_id,
      type: item.type as TransactionType,
      amount: Number(item.amount),
      description: item.description,
      categoryId: item.category_id || undefined,
      accountId: item.account_id || undefined,
      memberId: item.member_id || undefined,
      frequency: item.frequency,
      dayOfMonth: item.day_of_month || undefined,
      dayOfWeek: item.day_of_week || undefined,
      startDate: item.start_date,
      endDate: item.end_date || undefined,
      isActive: item.is_active,
      notes: item.notes || undefined,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    })) as RecurringTransaction[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('recurring_transactions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return {
      id: data.id,
      userId: data.user_id,
      type: data.type as TransactionType,
      amount: Number(data.amount),
      description: data.description,
      categoryId: data.category_id || undefined,
      accountId: data.account_id || undefined,
      memberId: data.member_id || undefined,
      frequency: data.frequency,
      dayOfMonth: data.day_of_month || undefined,
      dayOfWeek: data.day_of_week || undefined,
      startDate: data.start_date,
      endDate: data.end_date || undefined,
      isActive: data.is_active,
      notes: data.notes || undefined,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as RecurringTransaction
  },

  async create(recurring: {
    user_id: string
    type: TransactionType
    amount: number
    description: string
    category_id?: string | null
    account_id?: string | null
    member_id?: string | null
    frequency: string
    day_of_month?: number | null
    day_of_week?: number | null
    start_date: string
    end_date?: string | null
    is_active?: boolean
    notes?: string | null
  }) {
    const { data, error } = await supabase
      .from('recurring_transactions')
      .insert([recurring])
      .select()
      .single()

    if (error) throw error
    return {
      id: data.id,
      userId: data.user_id,
      type: data.type as TransactionType,
      amount: Number(data.amount),
      description: data.description,
      categoryId: data.category_id || undefined,
      accountId: data.account_id || undefined,
      memberId: data.member_id || undefined,
      frequency: data.frequency,
      dayOfMonth: data.day_of_month || undefined,
      dayOfWeek: data.day_of_week || undefined,
      startDate: data.start_date,
      endDate: data.end_date || undefined,
      isActive: data.is_active,
      notes: data.notes || undefined,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as RecurringTransaction
  },

  async update(id: string, updates: {
    type?: TransactionType
    amount?: number
    description?: string
    category_id?: string | null
    account_id?: string | null
    member_id?: string | null
    frequency?: string
    day_of_month?: number | null
    day_of_week?: number | null
    start_date?: string
    end_date?: string | null
    is_active?: boolean
    notes?: string | null
  }) {
    const { data, error } = await supabase
      .from('recurring_transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return {
      id: data.id,
      userId: data.user_id,
      type: data.type as TransactionType,
      amount: Number(data.amount),
      description: data.description,
      categoryId: data.category_id || undefined,
      accountId: data.account_id || undefined,
      memberId: data.member_id || undefined,
      frequency: data.frequency,
      dayOfMonth: data.day_of_month || undefined,
      dayOfWeek: data.day_of_week || undefined,
      startDate: data.start_date,
      endDate: data.end_date || undefined,
      isActive: data.is_active,
      notes: data.notes || undefined,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as RecurringTransaction
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('recurring_transactions')
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
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      avatar: data.avatar_url || undefined,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as User
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    const dbUpdates: any = {}
    if (updates.name) dbUpdates.name = updates.name
    if (updates.email) dbUpdates.email = updates.email
    if (updates.avatar !== undefined) dbUpdates.avatar_url = updates.avatar

    const { data, error } = await supabase
      .from('users')
      .update(dbUpdates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      avatar: data.avatar_url || undefined,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as User
  },
}

// ============================================
// STORAGE API
// ============================================

export const storageApi = {
  async uploadAvatar(userId: string, file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(data.path)

    return publicUrl
  },

  async uploadAttachment(userId: string, file: File, transactionId?: string) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${transactionId || 'general'}/${Date.now()}.${fileExt}`
    const filePath = `attachments/${fileName}`

    const { data, error } = await supabase.storage
      .from('attachments')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('attachments')
      .getPublicUrl(data.path)

    return publicUrl
  },

  getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    return data.publicUrl
  },

  async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) throw error
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
      .eq('status', 'COMPLETED')

    if (error) throw error

    const balance = (data || []).reduce((acc, transaction) => {
      if (transaction.type === 'INCOME') {
        return acc + Number(transaction.amount)
      } else {
        return acc - Number(transaction.amount)
      }
    }, 0)

    return balance
  },

  async getMonthlyStats(userId: string, month: number, year: number) {
    const startDate = new Date(year, month, 1).toISOString().split('T')[0]
    const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('transactions')
      .select('amount, type')
      .eq('user_id', userId)
      .eq('status', 'COMPLETED')
      .gte('date', startDate)
      .lte('date', endDate)

    if (error) throw error

    const income = (data || [])
      .filter(t => t.type === 'INCOME')
      .reduce((acc, t) => acc + Number(t.amount), 0)

    const expense = (data || [])
      .filter(t => t.type === 'EXPENSE')
      .reduce((acc, t) => acc + Number(t.amount), 0)

    return {
      income,
      expense,
      savings: income - expense,
    }
  },
}
