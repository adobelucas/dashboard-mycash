import React from 'react'
import { Button } from '@/components/ui'

export interface SidebarToggleProps {
  isExpanded: boolean
  onToggle: () => void
}

export const SidebarToggle: React.FC<SidebarToggleProps> = ({
  isExpanded,
  onToggle,
}) => {
  return (
    <div className="px-4 py-2 border-t border-divider">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="w-full justify-start"
        aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
      >
        <svg
          className={`w-5 h-5 transition-transform ${isExpanded ? '' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
        {isExpanded && <span className="ml-2 text-sm">Colapsar</span>}
      </Button>
    </div>
  )
}
