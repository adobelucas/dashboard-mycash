import React from 'react'

export interface SkeletonProps {
  width?: string
  height?: string
  className?: string
  rounded?: boolean
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  className = '',
  rounded = false,
}) => {
  return (
    <div
      className={`
        bg-gray-200 animate-pulse
        ${rounded ? 'rounded-full' : 'rounded'}
        ${className}
      `}
      style={{ width, height }}
      aria-label="Carregando..."
    />
  )
}
