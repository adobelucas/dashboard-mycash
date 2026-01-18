/**
 * Utilitários de acessibilidade
 */

/**
 * Foca o primeiro elemento focável dentro de um container
 */
export const focusFirstElement = (container: HTMLElement) => {
  const focusableSelectors = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')

  const firstFocusable = container.querySelector(focusableSelectors) as HTMLElement
  if (firstFocusable) {
    firstFocusable.focus()
  }
}

/**
 * Foca o último elemento focável dentro de um container
 */
export const focusLastElement = (container: HTMLElement) => {
  const focusableSelectors = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')

  const focusables = Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[]
  if (focusables.length > 0) {
    focusables[focusables.length - 1].focus()
  }
}

/**
 * Trap de foco dentro de um container (para modais)
 */
export const trapFocus = (container: HTMLElement) => {
  const focusableSelectors = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')

  const focusables = Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[]
  const firstFocusable = focusables[0]
  const lastFocusable = focusables[focusables.length - 1]

  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault()
        lastFocusable?.focus()
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault()
        firstFocusable?.focus()
      }
    }
  }

  container.addEventListener('keydown', handleTab)

  return () => {
    container.removeEventListener('keydown', handleTab)
  }
}

/**
 * Anuncia mudanças para leitores de tela
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}
