import React from 'react'
import { Button, ThemeToggle } from '@/components/ui'

export const HeaderActions: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <Button
        variant="primary"
        size="sm"
        className="min-w-[44px] min-h-[44px]"
        aria-label="Nova transação"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </Button>
    </div>
  )
}
