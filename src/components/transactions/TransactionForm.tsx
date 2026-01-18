import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'
import { transactionsApi } from '@/services/api'
import { useToast } from '@/components/ui'
import { isValidAmount, isValidDate, isNotFutureDate } from '@/utils/validators'
import type { Transaction } from '@/types'

export interface TransactionFormProps {
  transaction?: Transaction
  userId: string
  onSuccess: () => void
  onCancel: () => void
}

const categories = [
  'Salário',
  'Alimentação',
  'Transporte',
  'Entretenimento',
  'Saúde',
  'Educação',
  'Moradia',
  'Outros',
]

export const TransactionForm: React.FC<TransactionFormProps> = ({
  transaction,
  userId,
  onSuccess,
  onCancel,
}) => {
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    description: transaction?.description || '',
    amount: transaction?.amount ? Math.abs(transaction.amount).toString() : '',
    type: transaction?.type || 'expense',
    category: transaction?.category || categories[0],
    date: transaction?.date ? new Date(transaction.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
  })

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória'
    }

    if (!formData.amount || !isValidAmount(Number(formData.amount))) {
      newErrors.amount = 'Valor inválido'
    }

    if (!isValidDate(formData.date)) {
      newErrors.date = 'Data inválida'
    } else if (!isNotFutureDate(formData.date)) {
      newErrors.date = 'Data não pode ser futura'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      showToast('Por favor, corrija os erros no formulário', 'error')
      return
    }

    setIsLoading(true)

    try {
      const amount = Number(formData.amount)
      const transactionData = {
        user_id: userId,
        type: formData.type as 'income' | 'expense',
        amount: formData.type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
        description: formData.description.trim(),
        category: formData.category,
        date: new Date(formData.date).toISOString(),
      }

      if (transaction) {
        await transactionsApi.update(transaction.id, transactionData)
        showToast('Transação atualizada com sucesso!', 'success')
      } else {
        await transactionsApi.create(transactionData)
        showToast('Transação criada com sucesso!', 'success')
      }

      onSuccess()
    } catch (error) {
      console.error('Error saving transaction:', error)
      showToast('Erro ao salvar transação', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Tipo
        </label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={formData.type === 'income' ? 'primary' : 'outline'}
            onClick={() => setFormData({ ...formData, type: 'income' })}
            disabled={isLoading}
          >
            Receita
          </Button>
          <Button
            type="button"
            variant={formData.type === 'expense' ? 'primary' : 'outline'}
            onClick={() => setFormData({ ...formData, type: 'expense' })}
            disabled={isLoading}
          >
            Despesa
          </Button>
        </div>
      </div>

      <Input
        label="Descrição"
        type="text"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        error={errors.description}
        disabled={isLoading}
        required
      />

      <Input
        label="Valor"
        type="number"
        step="0.01"
        min="0"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        error={errors.amount}
        disabled={isLoading}
        required
      />

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Categoria
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          disabled={isLoading}
          className="w-full px-4 py-2 text-base bg-surface border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 min-h-[48px] md:min-h-[44px]"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Data"
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        error={errors.date}
        disabled={isLoading}
        required
        max={new Date().toISOString().split('T')[0]}
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Salvando...' : transaction ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </form>
  )
}
