import React from 'react'
import { Card } from '@/components/ui'

export interface ChartData {
  label: string
  value: number
  color?: string
}

export interface AreaChartSeries {
  label: string
  data: number[]
  color: string
}

export interface ChartProps {
  title: string
  data: ChartData[]
  type?: 'bar' | 'line' | 'pie' | 'area'
  height?: number
  // Para gráfico de área: séries de dados e labels do eixo X
  areaSeries?: AreaChartSeries[]
  areaLabels?: string[]
  areaMaxValue?: number
}

export const Chart: React.FC<ChartProps> = ({
  title,
  data,
  type = 'bar',
  height = 200,
  areaSeries,
  areaLabels,
  areaMaxValue,
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

  if (type === 'area' && areaSeries && areaLabels) {
    const maxVal = areaMaxValue || Math.max(...areaSeries.flatMap(s => s.data), 1)
    const padding = 10
    const chartWidth = 100 - padding * 2
    const chartHeight = 100 - padding * 2
    const dataPoints = areaLabels.length

    // Calcular pontos para cada série
    const seriesPaths = areaSeries.map((series) => {
      const points: string[] = []
      const areaPath: string[] = []
      
      series.data.forEach((value, index) => {
        const x = padding + (index / (dataPoints - 1 || 1)) * chartWidth
        const y = padding + chartHeight - (value / maxVal) * chartHeight
        points.push(`${x},${y}`)
        
        if (index === 0) {
          areaPath.push(`M ${x} ${padding + chartHeight}`)
        }
        areaPath.push(`L ${x} ${y}`)
      })
      
      // Fechar a área
      const lastX = padding + ((dataPoints - 1) / (dataPoints - 1 || 1)) * chartWidth
      areaPath.push(`L ${lastX} ${padding + chartHeight} Z`)
      
      return {
        linePoints: points.join(' '),
        areaPath: areaPath.join(' '),
        color: series.color,
      }
    })

    return (
      <Card className="w-full">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5 text-text-tertiary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        </div>
        <div style={{ height: `${height}px` }} className="relative">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            {/* Grid lines e labels do eixo Y */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = padding + chartHeight - (ratio * chartHeight)
              const value = maxVal * ratio
              return (
                <g key={ratio}>
                  <line
                    x1={padding}
                    y1={y}
                    x2={padding + chartWidth}
                    y2={y}
                    stroke="var(--color-border)"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                  <text
                    x={padding - 2}
                    y={y + 1}
                    fontSize="3"
                    fill="var(--color-text-tertiary)"
                    textAnchor="end"
                    dominantBaseline="middle"
                  >
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 0,
                    }).format(value)}
                  </text>
                </g>
              )
            })}
            
            {/* Áreas coloridas (desenhar primeiro para ficar atrás das linhas) */}
            {seriesPaths.map((series, idx) => (
              <path
                key={`area-${idx}`}
                d={series.areaPath}
                fill={series.color}
                opacity="0.3"
              />
            ))}
            
            {/* Linhas */}
            {seriesPaths.map((series, idx) => (
              <polyline
                key={`line-${idx}`}
                points={series.linePoints}
                fill="none"
                stroke={series.color}
                strokeWidth="1.5"
              />
            ))}
            
            {/* Labels do eixo X (meses) */}
            {areaLabels.map((label, index) => {
              const x = padding + (index / (dataPoints - 1 || 1)) * chartWidth
              return (
                <text
                  key={label}
                  x={x}
                  y={padding + chartHeight + 4}
                  fontSize="3"
                  fill="var(--color-text-tertiary)"
                  textAnchor="middle"
                >
                  {label}
                </text>
              )
            })}
          </svg>
        </div>
        {/* Legenda */}
        <div className="flex items-center justify-center gap-4 mt-4">
          {areaSeries.map((series) => (
            <div key={series.label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: series.color }}
              />
              <span className="text-xs text-text-secondary">{series.label}</span>
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
