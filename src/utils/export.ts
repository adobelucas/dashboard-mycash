import type { Transaction } from '@/types'
import { formatDate, formatCurrency } from './formatters'

/**
 * Exporta transações para CSV
 */
export const exportToCSV = (transactions: Transaction[], filename = 'transacoes.csv') => {
  const headers = ['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor']
  const rows = transactions.map(t => [
    formatDate(t.date),
    t.description,
    t.category,
    t.type === 'income' ? 'Receita' : 'Despesa',
    formatCurrency(t.amount),
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n')

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Exporta transações para JSON
 */
export const exportToJSON = (transactions: Transaction[], filename = 'transacoes.json') => {
  const dataStr = JSON.stringify(transactions, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Gera PDF simples (texto formatado)
 */
export const exportToPDF = async (transactions: Transaction[], filename = 'transacoes.pdf') => {
  // Implementação básica - em produção, usar biblioteca como jsPDF
  const content = transactions.map(t => 
    `${formatDate(t.date)} | ${t.description} | ${t.category} | ${formatCurrency(t.amount)}`
  ).join('\n')

  const blob = new Blob([content], { type: 'text/plain' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename.replace('.pdf', '.txt'))
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
