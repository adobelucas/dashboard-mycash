import React from 'react'
import { Card } from '@/components/ui'

export interface CategoryCardProps {
  category: string
  percentage: number
  amount: number
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  percentage,
  amount,
}) => {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount)

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-text-secondary">{category}</span>
        <span className="text-xs font-semibold text-text-primary">{percentage}%</span>
      </div>
      <p className="text-lg font-bold text-text-primary">{formattedAmount}</p>
    </Card>
  )
}
