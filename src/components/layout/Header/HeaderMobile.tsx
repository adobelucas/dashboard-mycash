import React, { useState } from 'react'
import { MobileMenu } from './MobileMenu'
import { HeaderActions } from './HeaderActions'
import { ThemeToggle } from '@/components/ui'

export const HeaderMobile: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-divider z-30 flex items-center justify-between px-4">
        {/* Logo e botão de menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-md hover:bg-surface text-text-secondary hover:text-text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Abrir menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-lg font-bold text-text-primary">MYCash+</span>
          </div>
        </div>

        {/* Ações do header */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <HeaderActions />
        </div>
      </header>

      {/* Menu drawer */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
