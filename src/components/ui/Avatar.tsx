import React from 'react'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, size = 'md', fallback, className = '', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full bg-gray-200 text-text-primary font-medium overflow-hidden'
    
    const sizes = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-lg',
    }
    
    const classes = `${baseStyles} ${sizes[size]} ${className}`
    
    const getInitials = (name?: string) => {
      if (!name) return '?'
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    
    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{fallback || getInitials(alt)}</span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'
