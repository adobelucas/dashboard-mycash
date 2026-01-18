import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase
// Em produção, essas variáveis devem vir de variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para as tabelas do Supabase
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          avatar_url?: string
          phone?: string
          created_at: string
          updated_at: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          type: 'income' | 'expense'
          amount: number
          description: string
          category: string
          date: string
          created_at: string
          updated_at: string
        }
      }
      cards: {
        Row: {
          id: string
          user_id: string
          name: string
          number: string
          type: 'credit' | 'debit'
          brand: 'visa' | 'mastercard' | 'elo' | 'other'
          limit?: number
          available_limit?: number
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
