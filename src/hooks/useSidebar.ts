import { useState } from 'react'

const SIDEBAR_STORAGE_KEY = 'sidebar-expanded'

/**
 * Hook para gerenciar o estado da sidebar (expanded/collapsed)
 * Persiste o estado no localStorage
 */
export function useSidebar() {
  const [isExpanded, setIsExpanded] = useState(() => {
    // Tentar recuperar do localStorage
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY)
    if (stored !== null) {
      return stored === 'true'
    }
    // Padrão: expanded
    return true
  })

  const toggle = () => {
    setIsExpanded(prev => {
      const newValue = !prev
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(newValue))
      return newValue
    })
  }

  const expand = () => {
    setIsExpanded(true)
    localStorage.setItem(SIDEBAR_STORAGE_KEY, 'true')
  }

  const collapse = () => {
    setIsExpanded(false)
    localStorage.setItem(SIDEBAR_STORAGE_KEY, 'false')
  }

  return {
    isExpanded,
    toggle,
    expand,
    collapse,
  }
}
