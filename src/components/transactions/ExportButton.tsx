import React, { useState } from 'react'
import { Button } from '@/components/ui'
import { exportToCSV, exportToJSON, exportToPDF } from '@/utils/export'
import type { Transaction } from '@/types'

export interface ExportButtonProps {
  transactions: Transaction[]
  disabled?: boolean
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  transactions,
  disabled = false,
}) => {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (format: 'csv' | 'json' | 'pdf') => {
    if (transactions.length === 0) return

    setIsExporting(true)
    try {
      switch (format) {
        case 'csv':
          exportToCSV(transactions)
          break
        case 'json':
          exportToJSON(transactions)
          break
        case 'pdf':
          await exportToPDF(transactions)
          break
      }
    } catch (error) {
      console.error('Error exporting:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleExport('csv')}
        disabled={disabled || isExporting || transactions.length === 0}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleExport('json')}
        disabled={disabled || isExporting || transactions.length === 0}
      >
        JSON
      </Button>
    </div>
  )
}
