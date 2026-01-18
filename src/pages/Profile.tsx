import React, { useState } from 'react'
import { ProfileHeader, ProfileForm } from '@/components/profile'
import { Loading } from '@/components/ui'
import { useApp } from '@/contexts'
import { userApi } from '@/services/api'
import type { ProfileFormData } from '@/components/profile'

export const Profile: React.FC = () => {
  const { user, refreshAll } = useApp()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: ProfileFormData) => {
    if (!user) return
    
    try {
      setIsLoading(true)
      await userApi.updateProfile(user.id, data)
      await refreshAll()
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return <Loading fullScreen message="Carregando perfil..." />
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Perfil
        </h1>
        <p className="text-sm text-text-secondary">
          Gerencie suas informações pessoais
        </p>
      </div>

      {/* Profile Header */}
      <ProfileHeader
        name={user.name}
        email={user.email}
        avatar={user.avatar}
      />

      {/* Profile Form */}
      <ProfileForm
        initialData={{
          name: user.name,
          email: user.email,
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}
