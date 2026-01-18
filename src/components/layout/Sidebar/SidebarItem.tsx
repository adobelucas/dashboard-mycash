import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  to: string
  isCollapsed: boolean
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  to,
  isCollapsed,
}) => {
  const location = useLocation()
  const isActive = location.pathname === to

  const baseStyles = 'flex items-center gap-3 px-4 py-3 rounded-md transition-colors min-h-[44px]'
  const activeStyles = isActive
    ? 'bg-primary/10 text-primary font-semibold'
    : 'text-text-secondary hover:bg-surface hover:text-text-primary'
  const collapsedStyles = isCollapsed ? 'justify-center' : ''

  return (
    <Link
      to={to}
      className={`${baseStyles} ${activeStyles} ${collapsedStyles}`}
      title={isCollapsed ? label : undefined}
    >
      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
        {icon}
      </span>
      {!isCollapsed && (
        <span className="text-sm font-medium">{label}</span>
      )}
    </Link>
  )
}
