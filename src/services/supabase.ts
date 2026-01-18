import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase
// Em produção, essas variáveis devem vir de variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Criar cliente Supabase com valores placeholder para evitar erros
// O cliente funcionará mesmo sem configuração real (apenas não fará requisições)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
})

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
