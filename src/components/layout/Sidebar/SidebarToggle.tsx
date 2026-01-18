import React from 'react'

export interface SidebarToggleProps {
  isExpanded: boolean
  onToggle: () => void
}

export const SidebarToggle: React.FC<SidebarToggleProps> = ({
  isExpanded,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-md
        text-text-secondary hover:bg-surface hover:text-text-primary
        transition-colors min-h-[44px]
        ${isExpanded ? 'justify-start' : 'justify-center'}
      `}
      aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
    >
      <svg
        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
          isExpanded ? '' : 'rotate-180'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {isExpanded && (
        <span className="text-sm font-medium">Colapsar</span>
      )}
    </button>
  )
}
