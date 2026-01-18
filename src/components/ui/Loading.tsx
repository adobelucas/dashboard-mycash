import React from 'react'

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
  message?: string
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  fullScreen = false,
  message,
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const spinner = (
    <div className={`${sizes[size]} border-2 border-primary border-t-transparent rounded-full animate-spin`} />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          {message && <p className="text-sm text-text-secondary">{message}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8">
      {spinner}
      {message && <p className="text-sm text-text-secondary">{message}</p>}
    </div>
  )
}
