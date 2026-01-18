/**
 * Constantes do sistema
 */

export const CATEGORIES = [
  'Salário',
  'Alimentação',
  'Transporte',
  'Entretenimento',
  'Saúde',
  'Educação',
  'Moradia',
  'Outros',
] as const

export const CARD_BRANDS = ['visa', 'mastercard', 'elo', 'other'] as const

export const TRANSACTION_TYPES = ['income', 'expense'] as const

export const CARD_TYPES = ['credit', 'debit'] as const

/**
 * Configurações de paginação
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
} as const

/**
 * Configurações de debounce
 */
export const DEBOUNCE_DELAYS = {
  SEARCH: 500,
  FILTER: 300,
} as const

/**
 * Mensagens do sistema
 */
export const MESSAGES = {
  SUCCESS: {
    TRANSACTION_CREATED: 'Transação criada com sucesso!',
    TRANSACTION_UPDATED: 'Transação atualizada com sucesso!',
    TRANSACTION_DELETED: 'Transação excluída com sucesso!',
    CARD_CREATED: 'Cartão criado com sucesso!',
    CARD_UPDATED: 'Cartão atualizado com sucesso!',
    CARD_DELETED: 'Cartão excluído com sucesso!',
    PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  },
  ERROR: {
    TRANSACTION_CREATE: 'Erro ao criar transação',
    TRANSACTION_UPDATE: 'Erro ao atualizar transação',
    TRANSACTION_DELETE: 'Erro ao excluir transação',
    CARD_CREATE: 'Erro ao criar cartão',
    CARD_UPDATE: 'Erro ao atualizar cartão',
    CARD_DELETE: 'Erro ao excluir cartão',
    PROFILE_UPDATE: 'Erro ao atualizar perfil',
    LOAD_DATA: 'Erro ao carregar dados',
    AUTH_REQUIRED: 'Você precisa estar autenticado para acessar esta página',
  },
} as const
