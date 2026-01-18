# 📋 ANÁLISE COMPLETA DO PROJETO - MYCASH+

## Status: Aguardando Acesso ao Figma

Para completar esta análise, preciso de:
- **Seleção ativa no Figma Desktop** com as telas do mycash+, OU
- **Link do arquivo Figma** (formato: `https://www.figma.com/file/...`)

---

## 1. MAPEAMENTO DE COMPONENTES VISUAIS

### Telas a Analisar:
- ✅ Dashboard
- ✅ Cartões
- ✅ Transações
- ✅ Perfil

### Estrutura de Componentes (a ser completada após acesso ao Figma):

#### **Dashboard**
- [ ] Componentes de layout (Sidebar, Header, Main Content)
- [ ] Cards de resumo (Saldo, Receitas, Despesas, etc.)
- [ ] Gráficos/Visualizações
- [ ] Lista de transações recentes
- [ ] Ações rápidas
- [ ] Outros componentes específicos

#### **Cartões**
- [ ] Lista de cartões
- [ ] Card individual (visualização)
- [ ] Detalhes do cartão
- [ ] Ações (adicionar, editar, excluir)
- [ ] Filtros/Busca
- [ ] Outros componentes específicos

#### **Transações**
- [ ] Lista de transações
- [ ] Item de transação
- [ ] Filtros (data, categoria, tipo)
- [ ] Formulário de nova transação
- [ ] Paginação/Infinite scroll
- [ ] Outros componentes específicos

#### **Perfil**
- [ ] Header do perfil (avatar, nome)
- [ ] Formulário de edição
- [ ] Configurações
- [ ] Preferências
- [ ] Outros componentes específicos

### Hierarquia Visual (a ser mapeada):
- Níveis de importância visual
- Agrupamentos e relações entre componentes
- Fluxo de leitura e atenção
- Peso visual (cores, tamanhos, espaçamentos)

---

## 2. VARIÁVEIS DO DESIGN SYSTEM

### Variáveis Semânticas (a identificar no Figma):
- [ ] Cores semânticas:
  - `--color-primary`
  - `--color-secondary`
  - `--color-background`
  - `--color-surface`
  - `--color-text-primary`
  - `--color-text-secondary`
  - `--color-error`
  - `--color-success`
  - `--color-warning`
  - `--color-border`
  - Outras...

- [ ] Espaçamentos semânticos:
  - `--spacing-container`
  - `--spacing-section`
  - `--spacing-card`
  - Outras...

- [ ] Tipografia semântica:
  - `--font-heading`
  - `--font-body`
  - `--font-mono`
  - Outras...

### Variáveis Primitivas (a identificar no Figma):

#### **Cores Primitivas**
- [ ] Escala de cinzas: `--gray-50` até `--gray-900`
- [ ] Cores primárias: `--lime-*`, `--green-*`, etc.
- [ ] Outras famílias de cores

#### **Espaçamentos Primitivos**
- [ ] `--spacing-xs` (4px?)
- [ ] `--spacing-sm` (8px?)
- [ ] `--spacing-md` (16px?)
- [ ] `--spacing-lg` (24px?)
- [ ] `--spacing-xl` (32px?)
- [ ] `--spacing-2xl` (48px?)
- [ ] Outros valores da escala

#### **Tipografia Primitiva**
- [ ] Font-family: `--font-family-base`
- [ ] Font-sizes: `--font-size-xs` até `--font-size-2xl`
- [ ] Font-weights: `--font-weight-normal`, `--font-weight-semibold`, `--font-weight-bold`
- [ ] Line-heights: `--line-height-tight`, `--line-height-normal`, `--line-height-relaxed`

#### **Shape (Bordas, Sombras)**
- [ ] Border-radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`
- [ ] Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- [ ] Borders: `--border-width`, `--border-color`

---

## 3. ESTRUTURA DE NAVEGAÇÃO

### Sidebar Desktop (≥1280px)

#### **Estado Expandido**
- [ ] Largura da sidebar
- [ ] Elementos visíveis:
  - Logo/Branding
  - Itens de navegação com ícone + texto
  - Seções agrupadas
  - Footer da sidebar (se houver)
- [ ] Espaçamentos internos
- [ ] Estados de hover/active
- [ ] Transição para collapsed

#### **Estado Colapsado**
- [ ] Largura da sidebar (apenas ícones)
- [ ] Elementos visíveis:
  - Logo/Branding (versão compacta)
  - Apenas ícones dos itens
  - Tooltips ao hover
- [ ] Espaçamentos internos
- [ ] Transição para expanded

#### **Comportamento**
- [ ] Botão toggle (posição, estilo)
- [ ] Animação de transição
- [ ] Como o conteúdo principal se adapta
- [ ] Persistência do estado (localStorage?)

### Header Mobile (<1280px)

#### **Elementos**
- [ ] Logo/Branding
- [ ] Botão de menu (hamburger)
- [ ] Ações principais (ex: botão "+" para nova transação)
- [ ] Altura do header
- [ ] Background/cor
- [ ] Sombras/bordas

#### **Menu Drawer**
- [ ] Posição (lateral esquerda/direita)
- [ ] Largura
- [ ] Overlay/backdrop
- [ ] Itens de navegação
- [ ] Animação de abertura/fechamento
- [ ] Fechamento ao clicar fora ou em item

### Transições entre Seções

- [ ] Tipo de transição (fade, slide, instantânea)
- [ ] Duração das animações
- [ ] Estados de loading
- [ ] Scroll behavior (topo da página ao mudar?)

---

## 4. ARQUITETURA PROPOSTA

### Estrutura de Pastas

```
Dashboard-MYCash/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.tsx              # Componente principal
│   │   │   │   ├── SidebarItem.tsx          # Item de navegação
│   │   │   │   ├── SidebarToggle.tsx        # Botão expand/collapse
│   │   │   │   ├── SidebarLogo.tsx          # Logo/branding
│   │   │   │   └── index.ts                 # Exports
│   │   │   ├── Header/
│   │   │   │   ├── HeaderMobile.tsx         # Header para mobile/tablet
│   │   │   │   ├── MobileMenu.tsx           # Drawer de navegação
│   │   │   │   ├── HeaderActions.tsx        # Ações do header
│   │   │   │   └── index.ts
│   │   │   └── Layout.tsx                   # Layout wrapper principal
│   │   ├── dashboard/
│   │   │   ├── DashboardCard.tsx            # Card genérico
│   │   │   ├── BalanceCard.tsx              # Card de saldo
│   │   │   ├── SummaryCard.tsx              # Card de resumo
│   │   │   ├── TransactionList.tsx           # Lista de transações
│   │   │   ├── QuickActions.tsx             # Ações rápidas
│   │   │   └── index.ts
│   │   ├── cards/
│   │   │   ├── CardList.tsx                  # Lista de cartões
│   │   │   ├── CardItem.tsx                  # Item individual
│   │   │   ├── CardDetails.tsx               # Detalhes do cartão
│   │   │   ├── CardForm.tsx                  # Formulário de cartão
│   │   │   └── index.ts
│   │   ├── transactions/
│   │   │   ├── TransactionList.tsx           # Lista de transações
│   │   │   ├── TransactionItem.tsx           # Item individual
│   │   │   ├── TransactionFilters.tsx        # Filtros
│   │   │   ├── TransactionForm.tsx            # Formulário
│   │   │   └── index.ts
│   │   ├── profile/
│   │   │   ├── ProfileHeader.tsx             # Header do perfil
│   │   │   ├── ProfileForm.tsx               # Formulário de edição
│   │   │   ├── ProfileSettings.tsx           # Configurações
│   │   │   └── index.ts
│   │   └── ui/                               # Componentes base reutilizáveis
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Badge.tsx
│   │       ├── Avatar.tsx
│   │       └── index.ts
│   ├── pages/
│   │   ├── Dashboard.tsx                     # Apenas composição
│   │   ├── Cards.tsx
│   │   ├── Transactions.tsx
│   │   └── Profile.tsx
│   ├── hooks/
│   │   ├── useSidebar.ts                    # Estado da sidebar
│   │   ├── useMediaQuery.ts                 # Breakpoints
│   │   ├── useTransactions.ts               # Lógica de transações
│   │   └── index.ts
│   ├── services/                            # Lógica de negócio
│   │   ├── api.ts                           # Cliente API
│   │   ├── supabase.ts                      # Cliente Supabase
│   │   ├── transactions.ts                  # Serviço de transações
│   │   └── index.ts
│   ├── styles/
│   │   ├── globals.css                      # Variáveis CSS do design system
│   │   └── tailwind.config.ts               # Config Tailwind com tokens
│   ├── types/
│   │   ├── transaction.ts
│   │   ├── card.ts
│   │   ├── user.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── formatters.ts                   # Formatação de valores
│   │   ├── validators.ts                   # Validações
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── vite.config.ts
```

### Hierarquia de Componentes

```
App
└── Layout
    ├── Sidebar (desktop only, ≥1280px)
    │   ├── SidebarLogo
    │   ├── SidebarItem[] (navegação)
    │   └── SidebarToggle
    └── Main Content
        ├── HeaderMobile (mobile/tablet only, <1280px)
        │   ├── Logo
        │   ├── MenuButton (abre MobileMenu)
        │   └── HeaderActions
        └── Page Content (Dashboard/Cards/Transactions/Profile)
            └── Componentes específicos da página
```

### Estratégia de Componentização

#### **Princípios:**
1. **Separação de Responsabilidades:**
   - **Páginas**: Apenas composição de componentes, sem lógica
   - **Componentes**: Apresentação e interação UI
   - **Hooks**: Lógica de estado e efeitos
   - **Services**: Lógica de negócio e comunicação com API

2. **Reutilização:**
   - Componentes UI base em `components/ui/`
   - Componentes específicos de domínio em suas respectivas pastas
   - Composição sobre herança

3. **Mobile-First:**
   - Base sempre mobile
   - Breakpoints apenas evoluem o layout
   - Nunca recriar layouts por breakpoint

4. **Layout Fluido:**
   - Containers principais: `width: 100%`
   - Limitação: `max-width` (nunca `width` fixa)
   - Grids responsivos: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

#### **Níveis de Componentização:**

1. **Átomos** (`components/ui/`):
   - Button, Input, Card, Badge, Avatar
   - Altamente reutilizáveis, sem dependências de domínio

2. **Moléculas** (componentes específicos):
   - TransactionItem, CardItem, DashboardCard
   - Compõem átomos, têm contexto de domínio

3. **Organismos** (seções completas):
   - TransactionList, CardList, DashboardSummary
   - Compõem moléculas, formam seções funcionais

4. **Templates** (páginas):
   - Dashboard, Cards, Transactions, Profile
   - Apenas composição, sem lógica

---

## 5. DESIGN SYSTEM E TOKENS

### Hierarquia de Variáveis (OBRIGATÓRIA)

1. **Variáveis Semânticas** (prioridade máxima)
   - Ex: `--color-primary`, `--spacing-container`
   - Usar diretamente quando aplicadas no Figma

2. **Variáveis Primitivas**
   - Ex: `--gray-900`, `--lime-500`, `--spacing-md`
   - Usar quando semânticas não existirem

3. **Conversão Inteligente** (último recurso)
   - Cores HEX → primitiva mais próxima
   - Espaçamentos px → token mais próximo
   - Tipografia → escala tipográfica

4. **NUNCA valores hardcoded**

### Integração com Tailwind

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Mapear variáveis CSS para Tailwind
        primary: 'var(--color-primary)',
        gray: {
          50: 'var(--gray-50)',
          // ... outras escalas
        }
      },
      spacing: {
        // Mapear espaçamentos
        container: 'var(--spacing-container)',
        // ...
      },
      // ... outras configurações
    }
  }
}
```

---

## 6. RESPONSIVIDADE E BREAKPOINTS

### Breakpoints Oficiais

```typescript
screens: {
  'md': '768px',   // Tablet
  'lg': '1280px',  // Desktop
  'xl': '1920px',  // Wide / 4K
}
```

### Containers e Espaçamentos

- **Padding principal:**
  - Mobile: `px-4` (16px)
  - Tablet: `px-6` (24px)
  - Desktop: `px-8` (32px)

- **Max-width:**
  - Desktop: `max-w-[1400px]`
  - Wide/4K: `max-w-[1600px]`

### Grids Padrão

- **Mobile:** 1 coluna, cards empilhados
- **Tablet:** 2 colunas quando fizer sentido
- **Desktop:** 3-4 colunas, auto-fit/auto-fill

---

## 7. PRÓXIMOS PASSOS

1. ✅ **Aguardando acesso ao Figma** para completar:
   - Mapeamento completo de componentes
   - Lista de todas as variáveis
   - Análise detalhada da navegação

2. ⏭️ **Após acesso ao Figma:**
   - Extrair componentes via `get_design_context`
   - Extrair variáveis via `get_variable_defs`
   - Analisar metadados via `get_metadata`
   - Documentar tudo neste arquivo

3. ⏭️ **Validação:**
   - Confirmar arquitetura proposta
   - Ajustar conforme necessário
   - Prosseguir para implementação

---

## Notas Importantes

- Layout 100% fluido (sem larguras fixas)
- Mobile-first obrigatório
- Sidebar NÃO renderiza em mobile/tablet
- Header Mobile NÃO renderiza em desktop
- Nunca renderizar Sidebar + Header Mobile juntos
- Priorizar variáveis semânticas sobre primitivas
- NUNCA usar valores hardcoded
