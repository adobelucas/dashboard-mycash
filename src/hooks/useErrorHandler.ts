import { useCallback } from 'react'
import { useToast } from '@/components/ui'

/**
 * Hook para tratamento centralizado de erros
 */
export function useErrorHandler() {
  const { showToast } = useToast()

  const handleError = useCallback((error: unknown, customMessage?: string) => {
    console.error('Error:', error)

    let message = customMessage || 'Ocorreu um erro inesperado'

    if (error instanceof Error) {
      message = error.message || message
    } else if (typeof error === 'string') {
      message = error
    }

    showToast(message, 'error')
  }, [showToast])

  const handleSuccess = useCallback((message: string) => {
    showToast(message, 'success')
  }, [showToast])

  return {
    handleError,
    handleSuccess,
  }
}
