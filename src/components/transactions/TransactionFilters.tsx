import React from 'react'
import { Card } from '@/components/ui'
import { Button } from '@/components/ui'

export interface TransactionFiltersProps {
  selectedType?: 'all' | 'income' | 'expense'
  selectedCategory?: string
  onTypeChange?: (type: 'all' | 'income' | 'expense') => void
  onCategoryChange?: (category: string) => void
  categories?: string[]
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  selectedType = 'all',
  selectedCategory,
  onTypeChange,
  onCategoryChange,
  categories = [],
}) => {
  return (
    <Card className="w-full">
      <div className="space-y-4">
        {/* Filtro por tipo */}
        <div>
          <p className="text-sm font-medium text-text-primary mb-2">Tipo</p>
          <div className="flex gap-2">
            <Button
              variant={selectedType === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onTypeChange?.('all')}
            >
              Todos
            </Button>
            <Button
              variant={selectedType === 'income' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onTypeChange?.('income')}
            >
              Receitas
            </Button>
            <Button
              variant={selectedType === 'expense' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onTypeChange?.('expense')}
            >
              Despesas
            </Button>
          </div>
        </div>

        {/* Filtro por categoria */}
        {categories.length > 0 && (
          <div>
            <p className="text-sm font-medium text-text-primary mb-2">Categoria</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!selectedCategory ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onCategoryChange?.('')}
              >
                Todas
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => onCategoryChange?.(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
