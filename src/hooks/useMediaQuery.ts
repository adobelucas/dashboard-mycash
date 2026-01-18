import { useState, useEffect } from 'react'

/**
 * Hook para detectar breakpoints responsivos
 * @param query - Media query string (ex: '(min-width: 1280px)')
 * @returns boolean indicando se a query corresponde
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Verificar inicialmente
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    
    // Listener para mudanças
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

/**
 * Hook para detectar se está em desktop (≥1280px)
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1280px)')
}

/**
 * Hook para detectar se está em tablet (≥768px e <1280px)
 */
export function useIsTablet(): boolean {
  const isTablet = useMediaQuery('(min-width: 768px)')
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  return isTablet && !isDesktop
}

/**
 * Hook para detectar se está em mobile (<768px)
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)')
}
