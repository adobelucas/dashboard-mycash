import React from 'react'
import { SidebarLogo } from './SidebarLogo'
import { SidebarItem } from './SidebarItem'
import { SidebarToggle } from './SidebarToggle'
import { SidebarFooter } from './SidebarFooter'
import { ThemeToggle } from '@/components/ui'
import { useSidebar } from '@/hooks/useSidebar'

const navigationItems = [
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    label: 'Dashboard',
    to: '/',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    label: 'Cartões',
    to: '/cards',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    label: 'Transações',
    to: '/transactions',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    label: 'Perfil',
    to: '/profile',
  },
]

export const Sidebar: React.FC = () => {
  const { isExpanded, toggle } = useSidebar()

  return (
    <aside
      className={`
        bg-surface border-r border-divider
        flex flex-col
        transition-all duration-300 ease-in-out
        flex-shrink-0
        ${isExpanded ? 'w-64' : 'w-20'}
        hidden lg:flex
      `}
    >
      <SidebarLogo isCollapsed={!isExpanded} />
      
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <SidebarItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isCollapsed={!isExpanded}
            />
          ))}
        </div>
      </nav>

      <div className="border-t border-divider">
        <div className="px-4 py-2">
          <ThemeToggle />
        </div>
        <SidebarToggle isExpanded={isExpanded} onToggle={toggle} />
      </div>

      {/* Footer com avatar do usuário */}
      <SidebarFooter isCollapsed={!isExpanded} />
    </aside>
  )
}
