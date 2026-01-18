import React from 'react'
import { Card } from '@/components/ui'

export interface ChartData {
  label: string
  value: number
  color?: string
}

export interface ChartProps {
  title: string
  data: ChartData[]
  type?: 'bar' | 'line' | 'pie'
  height?: number
}

export const Chart: React.FC<ChartProps> = ({
  title,
  data,
  type = 'bar',
  height = 200,
}) => {
  const maxValue = Math.max(...data.map(d => d.value), 1)

  if (type === 'bar') {
    return (
      <Card className="w-full">
        <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
        <div className="space-y-3" style={{ height: `${height}px` }}>
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-20 text-xs text-text-secondary flex-shrink-0">
                {item.label}
              </div>
              <div className="flex-1 relative">
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${(item.value / maxValue) * 100}%`,
                      backgroundColor: item.color || 'var(--color-primary)',
                    }}
                  />
                </div>
              </div>
              <div className="w-16 text-sm font-medium text-text-primary text-right flex-shrink-0">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(item.value)}
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (type === 'line') {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1 || 1)) * 100
      const y = 100 - (item.value / maxValue) * 100
      return `${x},${y}`
    }).join(' ')

    return (
      <Card className="w-full">
        <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
        <div style={{ height: `${height}px` }} className="relative">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <polyline
              points={points}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </Card>
    )
  }

  // Pie chart (simplificado)
  let currentAngle = 0
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="w-full">
      <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100
              const angle = (percentage / 100) * 360
              const startAngle = currentAngle
              currentAngle += angle

              const x1 = 50 + 50 * Math.cos((startAngle - 90) * (Math.PI / 180))
              const y1 = 50 + 50 * Math.sin((startAngle - 90) * (Math.PI / 180))
              const x2 = 50 + 50 * Math.cos((currentAngle - 90) * (Math.PI / 180))
              const y2 = 50 + 50 * Math.sin((currentAngle - 90) * (Math.PI / 180))
              const largeArc = angle > 180 ? 1 : 0

              return (
                <path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={item.color || `hsl(${index * 60}, 70%, 50%)`}
                />
              )
            })}
          </svg>
        </div>
        <div className="ml-6 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor: item.color || `hsl(${index * 60}, 70%, 50%)`,
                }}
              />
              <span className="text-sm text-text-secondary">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
