/**
 * Configuração de testes
 * 
 * Instale as dependências:
 * npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
 */

import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Estende os matchers do Vitest
expect.extend(matchers)

// Limpa após cada teste
afterEach(() => {
  cleanup()
})
