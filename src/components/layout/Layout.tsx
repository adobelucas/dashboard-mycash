import React from 'react'
import { Sidebar } from './Sidebar'
import { HeaderMobile } from './Header'
import { SkipToContent } from './SkipToContent'
import { useIsDesktop } from '@/hooks'

export interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isDesktop = useIsDesktop()

  return (
    <div className="min-h-screen bg-background flex">
      <SkipToContent />
      {/* Sidebar - apenas desktop (≥1280px) */}
      {isDesktop && <Sidebar />}

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Mobile - apenas mobile/tablet (<1280px) */}
        {!isDesktop && <HeaderMobile />}

        {/* Main content */}
        <main
          id="main-content"
          tabIndex={-1}
          className={`
            flex-1 w-full transition-all duration-300 ease-in-out
            ${!isDesktop ? 'pt-16' : ''}
          `}
        >
          <div className="w-full max-w-[1400px] lg:max-w-[1600px] mx-auto">
            <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
