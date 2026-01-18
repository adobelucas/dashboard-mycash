import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', hover = false, className = '', children, ...props }, ref) => {
    const baseStyles = 'bg-surface rounded-lg border border-border'
    
    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-4 md:p-6',
      lg: 'p-6 md:p-8',
    }
    
    const hoverStyles = hover ? 'transition-shadow hover:shadow-md' : ''
    
    const classes = `${baseStyles} ${paddings[padding]} ${hoverStyles} ${className}`
    
    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
