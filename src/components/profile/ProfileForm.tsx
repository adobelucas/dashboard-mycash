import React from 'react'
import { Card } from '@/components/ui'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'

export interface ProfileFormData {
  name: string
  email: string
  phone?: string
}

export interface ProfileFormProps {
  initialData?: ProfileFormData
  onSubmit?: (data: ProfileFormData) => void
  isLoading?: boolean
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = React.useState<ProfileFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <Card className="w-full">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Informações Pessoais
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nome"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          label="E-mail"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          label="Telefone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          helperText="Opcional"
        />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
