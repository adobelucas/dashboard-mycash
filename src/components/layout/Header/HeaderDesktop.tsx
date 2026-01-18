import React, { useState } from 'react'
import { Input, Button, Avatar } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/contexts'

export const HeaderDesktop: React.FC = () => {
  const navigate = useNavigate()
  const { familyMembers } = useApp()
  const [searchQuery, setSearchQuery] = useState('')

  // Usar familyMembers reais
  const members = familyMembers
    .filter(m => m.isActive)
    .slice(0, 3)
    .map(m => ({
      id: m.id,
      name: m.name,
      avatar: m.avatar,
    }))

  // Formatar data atual para o seletor (ex: "01 Jan - 31 Jan 2026")
  const formatDateRange = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.toLocaleDateString('pt-BR', { month: 'short' })
    const firstDay = `01 ${month.charAt(0).toUpperCase() + month.slice(1)}`
    const lastDay = `${new Date(year, now.getMonth() + 1, 0).getDate()} ${month.charAt(0).toUpperCase() + month.slice(1)}`
    return `${firstDay} - ${lastDay} ${year}`
  }

  return (
    <header className="hidden lg:flex lg:items-center lg:justify-between lg:gap-4 lg:px-6 lg:py-4 lg:bg-surface lg:border-b lg:border-divider">
      {/* Busca e Filtros */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Busca */}
        <div className="relative flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Pesquisar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filtro/Settings */}
        <button
          className="p-2 rounded-md hover:bg-surface text-text-secondary hover:text-text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Filtros"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </button>

        {/* Seletor de Data */}
        <button
          className="px-3 py-2 rounded-md bg-surface border border-border hover:bg-surface transition-colors text-sm text-text-primary min-h-[44px] flex items-center gap-2"
          aria-label="Selecionar período"
        >
          <svg
            className="w-4 h-4 text-text-tertiary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{formatDateRange()}</span>
        </button>
      </div>

      {/* Avatares de Membros e Botão Nova Transação */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Avatares de Membros */}
        <div className="flex items-center gap-2 -space-x-2">
          {members.map((member) => (
            <Avatar
              key={member.id}
              src={member.avatar}
              alt={member.name}
              size="sm"
              fallback={member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              className="border-2 border-surface"
            />
          ))}
          {/* Botão adicionar membro */}
          <button
            className="w-8 h-8 rounded-full bg-surface border-2 border-border flex items-center justify-center text-text-tertiary hover:text-text-primary hover:border-primary transition-colors min-w-[32px] min-h-[32px]"
            aria-label="Adicionar membro"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {/* Botão Nova Transação */}
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/transactions')}
          className="min-w-[140px]"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nova transação
        </Button>
      </div>
    </header>
  )
}
