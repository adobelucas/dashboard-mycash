import { useState, useEffect } from 'react'
import { supabase } from '@/services/supabase'
import type { User } from '@supabase/supabase-js'
import type { User as AppUser } from '@/types'

export interface AuthState {
  user: AppUser | null
  session: User | null
  isLoading: boolean
  error: string | null
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUser: (updates: Partial<AppUser>) => Promise<void>
}

export interface UseAuthReturn extends AuthState, AuthActions {}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<AppUser | null>(null)
  const [session, setSession] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Carregar sessão inicial e criar listener
  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSession(session.user)
        loadUserProfile(session.user.id)
      } else {
        setIsLoading(false)
      }
    })

    // Listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setSession(session.user)
        await loadUserProfile(session.user.id)
      } else {
        setSession(null)
        setUser(null)
        setIsLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Carregar perfil do usuário da tabela public.users
  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      if (data) {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          avatar: data.avatar_url || undefined,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        })
      }
    } catch (err) {
      console.error('Error loading user profile:', err)
      setError(err instanceof Error ? err.message : 'Erro ao carregar perfil')
    } finally {
      setIsLoading(false)
    }
  }

  // Login
  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        setSession(data.user)
        await loadUserProfile(data.user.id)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Registro
  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (error) throw error

      // O trigger handle_new_user criará o registro em public.users
      if (data.user) {
        setSession(data.user)
        await loadUserProfile(data.user.id)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Logout
  const signOut = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signOut()

      if (error) throw error

      setSession(null)
      setUser(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer logout')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Resetar senha
  const resetPassword = async (email: string) => {
    setError(null)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao resetar senha')
      throw err
    }
  }

  // Atualizar perfil do usuário
  const updateUser = async (updates: Partial<AppUser>) => {
    if (!user) return

    setError(null)
    try {
      const dbUpdates: any = {}
      if (updates.name) dbUpdates.name = updates.name
      if (updates.email) dbUpdates.email = updates.email
      if (updates.avatar !== undefined) dbUpdates.avatar_url = updates.avatar

      const { data, error } = await supabase
        .from('users')
        .update(dbUpdates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error

      if (data) {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          avatar: data.avatar_url || undefined,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar perfil')
      throw err
    }
  }

  return {
    user,
    session,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateUser,
  }
}
