import React from 'react'
import { Avatar } from '@/components/ui'
import { Card } from '@/components/ui'

export interface ProfileHeaderProps {
  name: string
  email: string
  avatar?: string
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  avatar,
}) => {
  return (
    <Card className="w-full">
      <div className="flex items-center gap-4">
        <Avatar src={avatar} alt={name} size="xl" fallback={name} />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-text-primary mb-1">{name}</h2>
          <p className="text-sm text-text-secondary">{email}</p>
        </div>
      </div>
    </Card>
  )
}
