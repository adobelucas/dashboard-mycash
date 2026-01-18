# 🔧 Guia de Manutenção - MYCash+ Dashboard

## 📋 Estrutura do Projeto

### Organização de Código

```
src/
├── components/     # Componentes React
│   ├── ui/        # Componentes base (Button, Input, etc.)
│   ├── layout/    # Layout (Sidebar, Header)
│   └── [feature]/ # Componentes específicos de features
├── contexts/      # Context API (estado global)
├── hooks/         # Custom hooks
├── pages/         # Páginas (apenas composição)
├── services/      # Serviços (API, Supabase)
├── styles/        # Estilos globais
├── types/         # TypeScript types
└── utils/         # Funções utilitárias
```

### Princípios de Organização

1. **Componentes UI**: Reutilizáveis, sem lógica de negócio
2. **Páginas**: Apenas composição de componentes
3. **Hooks**: Lógica reutilizável
4. **Services**: Comunicação com backend
5. **Utils**: Funções puras

---

## 🔨 Manutenção de Código

### Adicionar Novo Componente

1. Crie o arquivo em `src/components/[feature]/`
2. Exporte no `index.ts` da pasta
3. Use TypeScript para tipagem
4. Siga o padrão de design system

Exemplo:
```typescript
// src/components/feature/NewComponent.tsx
import React from 'react'
import { Card } from '@/components/ui'

export interface NewComponentProps {
  title: string
  onClick?: () => void
}

export const NewComponent: React.FC<NewComponentProps> = ({
  title,
  onClick,
}) => {
  return (
    <Card>
      <h3>{title}</h3>
      {/* ... */}
    </Card>
  )
}
```

### Adicionar Novo Hook

1. Crie o arquivo em `src/hooks/`
2. Exporte no `index.ts`
3. Use TypeScript para tipagem
4. Documente o uso

Exemplo:
```typescript
// src/hooks/useNewFeature.ts
import { useState, useEffect } from 'react'

export function useNewFeature() {
  const [state, setState] = useState()

  useEffect(() => {
    // Lógica
  }, [])

  return { state, setState }
}
```

### Adicionar Nova Página

1. Crie o arquivo em `src/pages/`
2. Exporte no `index.ts`
3. Adicione a rota em `src/App.tsx`
4. Use o componente `Layout`

Exemplo:
```typescript
// src/pages/NewPage.tsx
import React from 'react'
import { Layout } from '@/components/layout'

export const NewPage: React.FC = () => {
  return (
    <Layout>
      <div>
        {/* Conteúdo */}
      </div>
    </Layout>
  )
}
```

---

## 🎨 Design System

### Adicionar Novo Token

1. Adicione a variável CSS em `src/styles/globals.css`
2. Configure no `tailwind.config.ts` se necessário
3. Use tokens semânticos quando possível

Exemplo:
```css
/* src/styles/globals.css */
:root {
  --color-new-semantic: var(--gray-600);
}
```

```typescript
// tailwind.config.ts
colors: {
  'new-semantic': 'var(--color-new-semantic)',
}
```

### Adicionar Novo Componente UI

1. Crie em `src/components/ui/`
2. Exporte no `index.ts`
3. Use tokens do design system
4. Implemente variantes e tamanhos
5. Adicione acessibilidade

---

## 🗄️ Banco de Dados

### Adicionar Nova Tabela

1. Crie a tabela no Supabase
2. Configure RLS (Row Level Security)
3. Crie tipos TypeScript em `src/types/`
4. Crie serviço em `src/services/api.ts`

Exemplo SQL:
```sql
CREATE TABLE public.new_table (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.new_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data"
  ON public.new_table FOR SELECT
  USING (auth.uid() = user_id);
```

---

## 🧪 Testes

### Adicionar Teste

1. Crie o arquivo `*.test.tsx` próximo ao componente
2. Use Vitest e Testing Library
3. Teste comportamento, não implementação

Exemplo:
```typescript
// src/components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

### Executar Testes

```bash
npm run test
```

---

## 🐛 Debugging

### Erros Comuns

1. **Erro de TypeScript**
   - Verifique tipos em `src/types/`
   - Use `any` apenas quando necessário

2. **Erro de RLS no Supabase**
   - Verifique políticas de segurança
   - Teste com usuário autenticado

3. **Erro de Build**
   - Limpe cache: `rm -rf node_modules .vite`
   - Reinstale: `npm install`

### Ferramentas de Debug

- React DevTools
- Redux DevTools (se usar Redux)
- Network tab do navegador
- Console do Supabase

---

## 📦 Dependências

### Adicionar Nova Dependência

```bash
npm install nome-do-pacote
```

### Atualizar Dependências

```bash
npm update
```

### Verificar Vulnerabilidades

```bash
npm audit
npm audit fix
```

---

## 🔄 Versionamento

### Versionamento Semântico

- **MAJOR**: Mudanças incompatíveis
- **MINOR**: Novas funcionalidades compatíveis
- **PATCH**: Correções de bugs

### Changelog

Mantenha um `CHANGELOG.md` com:
- Data da versão
- Mudanças (Added, Changed, Fixed, Removed)

---

## 🚀 Deploy

### Checklist Antes do Deploy

- [ ] Testes passando
- [ ] Build sem erros
- [ ] Variáveis de ambiente configuradas
- [ ] Supabase configurado
- [ ] Documentação atualizada

### Processo de Deploy

1. Atualize a versão em `package.json`
2. Crie um commit com tag
3. Faça push para o repositório
4. Deploy automático (se configurado) ou manual

---

## 📚 Recursos

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Docs](https://vitejs.dev)

---

## 💡 Boas Práticas

1. **Sempre use TypeScript** para tipagem
2. **Siga o design system** para consistência
3. **Componentes pequenos** e reutilizáveis
4. **Separação de responsabilidades**
5. **Testes** para funcionalidades críticas
6. **Documentação** para código complexo
7. **Code review** antes de merge

---

**Manutenção contínua garante um projeto saudável! 🔧**
