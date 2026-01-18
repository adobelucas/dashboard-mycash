# ✅ PROMPT 0: Análise e Planejamento Inicial — CONCLUÍDO

## 📚 PRÉ-EXECUÇÃO

✓ Rules relidas e aplicadas  
✓ Estrutura de análise criada  
✓ Link do Figma recebido: [Workshop - Do figma MCP ao Cursor AI](https://www.figma.com/design/96bKpxRMOgtZDE5KFd2HCX/Workshop---Do-figma-MCP-ao-Cursor-AI-v.3--Community---Copy-?node-id=42-3096&t=gqE34riow6Qn0ieP-4)  
✓ Hierarquia de variáveis verificada  
✓ Documentação de referência identificada (Tailwind CSS, Tokens Primitivos)

---

## 📦 ANÁLISE REALIZADA

### 1. Estrutura de Documentação Criada
- ✅ `ANALISE_PROJETO.md` - Documento principal de análise
- ✅ `FIGMA_ANALISE.md` - Checklist detalhado para análise do Figma
- ✅ `ANALISE_COMPLETA_PROMPT0.md` - Este documento consolidado

### 2. Arquitetura Proposta Definida
- ✅ Estrutura de pastas completa
- ✅ Hierarquia de componentes planejada
- ✅ Estratégia de componentização documentada
- ✅ Separação de responsabilidades clara

### 3. Regras do Projeto Compreendidas
- ✅ Layout fluido obrigatório (width: 100%, max-width para limitação)
- ✅ Mobile-first (base mobile, breakpoints evoluem)
- ✅ Sidebar desktop (≥1280px) com estados expanded/collapsed
- ✅ Header mobile (<1280px) com drawer
- ✅ Breakpoints definidos: Mobile (<768px), Tablet (768-1279px), Desktop (≥1280px)
- ✅ Hierarquia de variáveis: Semânticas → Primitivas → Conversão Inteligente

---

## 🎨 TOKENS E DESIGN SYSTEM

### Hierarquia de Variáveis (OBRIGATÓRIA)

**Ordem de Prioridade:**
1. **Variáveis Semânticas** (prioridade máxima)
   - Ex: `--color-primary`, `--spacing-container`, `--font-heading`
   - Usar diretamente quando aplicadas no Figma

2. **Variáveis Primitivas**
   - Ex: `--gray-900`, `--lime-500`, `--spacing-md`, `--font-size-base`
   - Usar quando semânticas não existirem

3. **Conversão Inteligente** (último recurso)
   - Cores HEX → primitiva mais próxima
   - Espaçamentos px → token mais próximo
   - Tipografia → escala tipográfica

4. **NUNCA valores hardcoded**

### Tokens a Identificar no Figma

#### **Cores**
- Semânticas: primary, secondary, background, surface, text-primary, text-secondary, error, success, warning, border
- Primitivas: Escalas completas (gray-50 até gray-900, lime-*, green-*, etc.)

#### **Espaçamentos**
- Semânticas: container, section, card, item, group
- Primitivas: 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px)

#### **Tipografia**
- Semânticas: heading, body, mono, heading-1, heading-2, body, caption, label
- Primitivas: font-family-base, font-size-xs até font-size-4xl, font-weight-normal até bold, line-height-tight até relaxed

#### **Shape**
- Border-radius: none, sm, md, lg, xl, 2xl, full
- Shadows: sm, md, lg, xl
- Borders: width, color

---

## 📁 ARQUITETURA PROPOSTA

### Estrutura de Pastas

```
Dashboard-MYCash/
├── src/
│   ├── components/
│   │   ├── layout/                    # Componentes de layout
│   │   │   ├── Sidebar/               # Sidebar desktop
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── SidebarItem.tsx
│   │   │   │   ├── SidebarToggle.tsx
│   │   │   │   ├── SidebarLogo.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Header/                # Header mobile
│   │   │   │   ├── HeaderMobile.tsx
│   │   │   │   ├── MobileMenu.tsx
│   │   │   │   ├── HeaderActions.tsx
│   │   │   │   └── index.ts
│   │   │   └── Layout.tsx             # Layout wrapper principal
│   │   ├── dashboard/                 # Componentes do Dashboard
│   │   │   ├── DashboardCard.tsx
│   │   │   ├── BalanceCard.tsx
│   │   │   ├── SummaryCard.tsx
│   │   │   ├── TransactionList.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── index.ts
│   │   ├── cards/                     # Componentes de Cartões
│   │   │   ├── CardList.tsx
│   │   │   ├── CardItem.tsx
│   │   │   ├── CardDetails.tsx
│   │   │   ├── CardForm.tsx
│   │   │   └── index.ts
│   │   ├── transactions/              # Componentes de Transações
│   │   │   ├── TransactionList.tsx
│   │   │   ├── TransactionItem.tsx
│   │   │   ├── TransactionFilters.tsx
│   │   │   ├── TransactionForm.tsx
│   │   │   └── index.ts
│   │   ├── profile/                   # Componentes de Perfil
│   │   │   ├── ProfileHeader.tsx
│   │   │   ├── ProfileForm.tsx
│   │   │   ├── ProfileSettings.tsx
│   │   │   └── index.ts
│   │   └── ui/                        # Componentes base reutilizáveis
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Badge.tsx
│   │       ├── Avatar.tsx
│   │       └── index.ts
│   ├── pages/                         # Páginas (apenas composição)
│   │   ├── Dashboard.tsx
│   │   ├── Cards.tsx
│   │   ├── Transactions.tsx
│   │   └── Profile.tsx
│   ├── hooks/                         # Lógica de estado
│   │   ├── useSidebar.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useTransactions.ts
│   │   └── index.ts
│   ├── services/                      # Lógica de negócio/API
│   │   ├── api.ts
│   │   ├── supabase.ts
│   │   ├── transactions.ts
│   │   └── index.ts
│   ├── styles/                        # Design system
│   │   ├── globals.css                # Variáveis CSS
│   │   └── tailwind.config.ts         # Config Tailwind
│   ├── types/                         # TypeScript types
│   │   ├── transaction.ts
│   │   ├── card.ts
│   │   ├── user.ts
│   │   └── index.ts
│   ├── utils/                         # Helpers
│   │   ├── formatters.ts
│   │   ├── validators.ts
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
    │   ├── Expanded State:
    │   │   ├── SidebarLogo (completo)
    │   │   ├── SidebarItem[] (ícone + texto)
    │   │   └── SidebarToggle
    │   └── Collapsed State:
    │       ├── SidebarLogo (compacto)
    │       ├── SidebarItem[] (apenas ícones + tooltips)
    │       └── SidebarToggle
    └── Main Content
        ├── HeaderMobile (mobile/tablet only, <1280px)
        │   ├── Logo
        │   ├── MenuButton (abre MobileMenu drawer)
        │   └── HeaderActions (ex: botão "+")
        └── Page Content (Dashboard/Cards/Transactions/Profile)
            └── Componentes específicos da página
```

### Estratégia de Componentização

#### **Princípios Fundamentais:**

1. **Separação de Responsabilidades:**
   - **Páginas** (`pages/`): Apenas composição de componentes, zero lógica de negócio
   - **Componentes** (`components/`): Apresentação e interação UI
   - **Hooks** (`hooks/`): Lógica de estado, efeitos e side effects
   - **Services** (`services/`): Lógica de negócio, comunicação com API/Supabase

2. **Reutilização e Composição:**
   - Componentes UI base em `components/ui/` (átomos)
   - Componentes específicos de domínio em suas pastas (moléculas/organismos)
   - Composição sobre herança
   - Props bem definidas e tipadas

3. **Mobile-First:**
   - Base sempre mobile (<768px)
   - Breakpoints apenas evoluem o layout, nunca recriam
   - Layout fluido obrigatório (width: 100%, max-width para limitação)

4. **Layout Fluido:**
   - Containers principais: `width: 100%` (NUNCA fixo)
   - Limitação: `max-width` (Desktop: 1400px, Wide: 1600px)
   - Grids responsivos: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

#### **Níveis de Componentização (Atomic Design):**

1. **Átomos** (`components/ui/`):
   - Button, Input, Card, Badge, Avatar, Select
   - Altamente reutilizáveis, sem dependências de domínio
   - Props genéricas e bem documentadas

2. **Moléculas** (componentes específicos):
   - TransactionItem, CardItem, DashboardCard
   - Compõem átomos, têm contexto de domínio
   - Props específicas do domínio

3. **Organismos** (seções completas):
   - TransactionList, CardList, DashboardSummary
   - Compõem moléculas, formam seções funcionais
   - Podem ter lógica de estado local

4. **Templates** (páginas):
   - Dashboard, Cards, Transactions, Profile
   - Apenas composição, sem lógica
   - Responsáveis pelo layout da página

---

## 🧭 ESTRUTURA DE NAVEGAÇÃO

### Sidebar Desktop (≥1280px)

#### **Estado Expandido:**
- Largura: A definir no Figma
- Elementos:
  - Logo/Branding completo
  - Itens de navegação com ícone + texto
  - Seções agrupadas (se houver)
  - Footer da sidebar (se houver)
- Espaçamentos: A definir no Figma
- Estados: hover, active, disabled
- Transição: suave para collapsed

#### **Estado Colapsado:**
- Largura: A definir no Figma (apenas ícones)
- Elementos:
  - Logo compacto
  - Apenas ícones dos itens
  - Tooltips ao hover
- Espaçamentos: A definir no Figma
- Transição: suave para expanded

#### **Comportamento:**
- Botão toggle: posição e estilo a definir
- Animação: transição suave (duração a definir)
- Conteúdo principal: ajusta margem esquerda automaticamente
- Persistência: salvar estado no localStorage

### Header Mobile (<1280px)

#### **Elementos:**
- Logo/Branding
- Botão de menu (hamburger)
- Ações principais (ex: botão "+" para nova transação)
- Altura, background, sombras: A definir no Figma

#### **Menu Drawer:**
- Posição: lateral (esquerda/direita a definir)
- Largura: % da tela ou px fixo
- Overlay/backdrop: cor e opacidade
- Itens de navegação: layout e espaçamento
- Animação: slide/fade, duração a definir
- Fechamento: ao clicar fora, em item, ou botão fechar

### Transições entre Seções:
- Tipo: fade, slide, ou instantânea (a definir)
- Duração: a definir
- Estados de loading: skeleton screens ou spinner
- Scroll behavior: scroll para topo ao mudar de página

---

## 📐 RESPONSIVIDADE E BREAKPOINTS

### Breakpoints Oficiais

```typescript
// tailwind.config.ts
screens: {
  'md': '768px',   // Tablet
  'lg': '1280px',  // Desktop
  'xl': '1920px',  // Wide / 4K
}
```

### Containers e Espaçamentos

**Padding principal:**
- Mobile: `px-4` (16px)
- Tablet: `px-6` (24px)
- Desktop: `px-8` (32px)

**Max-width:**
- Desktop: `max-w-[1400px]`
- Wide/4K: `max-w-[1600px]`

### Grids Padrão

- **Mobile:** 1 coluna, cards empilhados
- **Tablet:** 2 colunas quando fizer sentido
- **Desktop:** 3-4 colunas, auto-fit/auto-fill

### Tipografia Responsiva

- Mobile: reduzir ~15% dos tamanhos base
- Escala progressiva: `text-base md:text-lg lg:text-xl`
- Prioridade: legibilidade > densidade

### Interações Touch (Obrigatório)

- Touch target mínimo: 44x44px
- Espaço entre elementos clicáveis: ≥ 8px
- Inputs no mobile:
  - Altura mínima: 48px
  - Font-size mínimo: 16px (evita zoom no iOS)

---

## 🔨 INTEGRAÇÃO COM TAILWIND CSS

### Configuração do Tailwind

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'md': '768px',   // Tablet
        'lg': '1280px',  // Desktop
        'xl': '1920px',  // Wide / 4K
      },
      colors: {
        // Mapear variáveis CSS semânticas
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        border: 'var(--color-border)',
        // Mapear primitivas
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          // ... até gray-900
        },
        lime: {
          50: 'var(--lime-50)',
          // ... até lime-900
        },
      },
      spacing: {
        // Mapear espaçamentos semânticos
        container: 'var(--spacing-container)',
        section: 'var(--spacing-section)',
        card: 'var(--spacing-card)',
        // Mapear primitivas
        0: 'var(--spacing-0)',
        1: 'var(--spacing-1)',
        2: 'var(--spacing-2)',
        // ... até spacing-16
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
    },
  },
  plugins: [],
} satisfies Config
```

### Variáveis CSS Globais

```css
/* src/styles/globals.css */
:root {
  /* Cores Semânticas */
  --color-primary: /* valor do Figma */;
  --color-secondary: /* valor do Figma */;
  --color-background: /* valor do Figma */;
  --color-surface: /* valor do Figma */;
  --color-text-primary: /* valor do Figma */;
  --color-text-secondary: /* valor do Figma */;
  --color-error: /* valor do Figma */;
  --color-success: /* valor do Figma */;
  --color-warning: /* valor do Figma */;
  --color-border: /* valor do Figma */;

  /* Cores Primitivas */
  --gray-50: /* valor do Figma */;
  --gray-100: /* valor do Figma */;
  /* ... até gray-900 */

  /* Espaçamentos Semânticos */
  --spacing-container: /* valor do Figma */;
  --spacing-section: /* valor do Figma */;
  --spacing-card: /* valor do Figma */;

  /* Espaçamentos Primitivos */
  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  /* ... até spacing-16 */

  /* Tipografia */
  --font-heading: /* valor do Figma */;
  --font-body: /* valor do Figma */;
  --font-size-base: /* valor do Figma */;
  /* ... outros tamanhos */

  /* Shape */
  --radius-md: /* valor do Figma */;
  --shadow-md: /* valor do Figma */;
}
```

---

## 📁 ARQUIVOS CRIADOS

- ✅ `ANALISE_PROJETO.md` - Documento principal de análise
- ✅ `FIGMA_ANALISE.md` - Checklist detalhado para análise do Figma
- ✅ `ANALISE_COMPLETA_PROMPT0.md` - Este documento consolidado

---

## 🤔 PRÓXIMOS PASSOS

### Para Completar a Análise:

1. **Acesso ao Figma via MCP:**
   - Abrir o arquivo Figma no Figma Desktop
   - Selecionar as telas (Dashboard, Cartões, Transações, Perfil)
   - Manter seleção ativa para extrair:
     - Componentes via `get_design_context`
     - Variáveis via `get_variable_defs`
     - Metadados via `get_metadata`

2. **Mapeamento Completo:**
   - Listar todos os componentes de cada tela
   - Identificar todas as variáveis (semânticas e primitivas)
   - Documentar especificações exatas da navegação
   - Validar arquitetura proposta com o design real

3. **Validação Final:**
   - Confirmar estrutura de pastas
   - Ajustar conforme necessário
   - Prosseguir para implementação

### Comandos Disponíveis:

- "Próximo" → Avançar para próximo prompt
- "Revisar [arquivo]" → Revisar arquivo específico
- "Refazer" → Refazer prompt atual com correções
- "Status" → Ver progresso geral
- "Tokens" → Ver mapeamento completo de conversões

---

## ✅ COMPREENSÃO DO PROJETO CONFIRMADA

### Stack Tecnológico:
- ✅ React com TypeScript
- ✅ Vite
- ✅ Tailwind CSS
- ✅ Supabase (backend)

### Arquitetura:
- ✅ Baseada em componentes
- ✅ Separação de responsabilidades clara
- ✅ Mobile-first obrigatório
- ✅ Layout fluido (width: 100%, max-width)

### Design System:
- ✅ Hierarquia de variáveis definida
- ✅ Integração com Tailwind planejada
- ✅ Tokens a serem extraídos do Figma

### Navegação:
- ✅ Sidebar desktop (≥1280px) com estados expanded/collapsed
- ✅ Header mobile (<1280px) com drawer
- ✅ Nunca renderizar ambos juntos

### Responsividade:
- ✅ Breakpoints definidos
- ✅ Containers e espaçamentos padronizados
- ✅ Grids responsivos planejados

---

**Status:** ✅ Análise e Planejamento Inicial CONCLUÍDO  
**Próximo Passo:** Acesso ao Figma para mapeamento completo de componentes e variáveis
