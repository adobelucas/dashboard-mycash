import React, { useState } from 'react'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'
import { cardsApi } from '@/services/api'
import { useToast } from '@/components/ui'
import { isValidCardNumber } from '@/utils/validators'
import type { Card } from '@/types'

export interface CardFormProps {
  card?: Card
  userId: string
  onSuccess: () => void
  onCancel: () => void
}

const brands = ['visa', 'mastercard', 'elo', 'other'] as const

export const CardForm: React.FC<CardFormProps> = ({
  card,
  userId,
  onSuccess,
  onCancel,
}) => {
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    name: card?.name || '',
    number: card?.number || '',
    type: card?.type || 'credit',
    brand: card?.brand || 'visa',
    limit: card?.limit?.toString() || '',
    availableLimit: card?.availableLimit?.toString() || '',
  })

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }

    if (!formData.number || !isValidCardNumber(formData.number)) {
      newErrors.number = 'Número de cartão inválido'
    }

    if (formData.type === 'credit') {
      if (!formData.limit || Number(formData.limit) <= 0) {
        newErrors.limit = 'Limite inválido'
      }
      if (!formData.availableLimit || Number(formData.availableLimit) < 0) {
        newErrors.availableLimit = 'Limite disponível inválido'
      }
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
      const cardData = {
        user_id: userId,
        name: formData.name.trim(),
        number: formData.number.replace(/\D/g, ''),
        type: formData.type as 'credit' | 'debit',
        brand: formData.brand,
        ...(formData.type === 'credit' && {
          limit: Number(formData.limit),
          available_limit: Number(formData.availableLimit),
        }),
      }

      if (card) {
        await cardsApi.update(card.id, cardData)
        showToast('Cartão atualizado com sucesso!', 'success')
      } else {
        await cardsApi.create(cardData)
        showToast('Cartão criado com sucesso!', 'success')
      }

      onSuccess()
    } catch (error) {
      console.error('Error saving card:', error)
      showToast('Erro ao salvar cartão', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome do Cartão"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        disabled={isLoading}
        required
      />

      <Input
        label="Número do Cartão"
        type="text"
        value={formData.number}
        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
        error={errors.number}
        disabled={isLoading}
        required
        placeholder="0000 0000 0000 0000"
      />

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Tipo
        </label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={formData.type === 'credit' ? 'primary' : 'outline'}
            onClick={() => setFormData({ ...formData, type: 'credit' })}
            disabled={isLoading}
          >
            Crédito
          </Button>
          <Button
            type="button"
            variant={formData.type === 'debit' ? 'primary' : 'outline'}
            onClick={() => setFormData({ ...formData, type: 'debit' })}
            disabled={isLoading}
          >
            Débito
          </Button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Bandeira
        </label>
        <select
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value as typeof brands[number] })}
          disabled={isLoading}
          className="w-full px-4 py-2 text-base bg-surface border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 min-h-[48px] md:min-h-[44px]"
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand.charAt(0).toUpperCase() + brand.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {formData.type === 'credit' && (
        <>
          <Input
            label="Limite Total"
            type="number"
            step="0.01"
            min="0"
            value={formData.limit}
            onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
            error={errors.limit}
            disabled={isLoading}
            required
          />

          <Input
            label="Limite Disponível"
            type="number"
            step="0.01"
            min="0"
            value={formData.availableLimit}
            onChange={(e) => setFormData({ ...formData, availableLimit: e.target.value })}
            error={errors.availableLimit}
            disabled={isLoading}
            required
          />
        </>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Salvando...' : card ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </form>
  )
}
