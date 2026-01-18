import React from 'react'
import { Avatar } from '@/components/ui'
import { useApp } from '@/contexts'

export interface SidebarFooterProps {
  isCollapsed: boolean
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {
  const { user } = useApp()

  if (!user) return null

  const displayName = user.name || 'Usuário'
  const displayEmail = user.email || 'email@exemplo.com'

  return (
    <div className="border-t border-divider px-4 py-4">
      {isCollapsed ? (
        <div className="flex justify-center">
          <Avatar
            src={user.avatar}
            alt={displayName}
            size="md"
            fallback={displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
          />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Avatar
            src={user.avatar}
            alt={displayName}
            size="md"
            fallback={displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">
              {displayName}
            </p>
            <p className="text-xs text-text-tertiary truncate">
              {displayEmail}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
