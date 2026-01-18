import React from 'react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: { value: string; label: string }[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className = '', ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-2 text-base bg-surface border border-border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed'
    const errorStyles = error ? 'border-error focus:ring-error' : ''
    const selectClasses = `${baseStyles} ${errorStyles} ${className}`
    
    // Garantir altura mínima de 48px no mobile
    const mobileStyles = 'min-h-[48px] md:min-h-[44px]'
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`${selectClasses} ${mobileStyles}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-text-secondary">{helperText}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
