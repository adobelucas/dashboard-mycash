import React from 'react'
import { Card } from '@/components/ui'
import { Button } from '@/components/ui'

export interface QuickAction {
  label: string
  icon: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'outline'
}

export interface QuickActionsProps {
  actions: QuickAction[]
  title?: string
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  title = 'Ações Rápidas',
}) => {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-text-primary mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || 'outline'}
            size="md"
            onClick={action.onClick}
            className="flex flex-col items-center gap-2 h-auto py-4 min-h-[80px]"
          >
            <span className="w-6 h-6 flex items-center justify-center">
              {action.icon}
            </span>
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  )
}
