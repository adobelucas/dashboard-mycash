# Dashboard MYCash

> Última atualização: Build corrigido e testado localmente ✅+

Dashboard financeiro pessoal desenvolvido com React, TypeScript, Vite e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Roteamento

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## 🏗️ Build

```bash
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes primitivos
│   ├── layout/          # Componentes de layout
│   ├── dashboard/       # Componentes do Dashboard
│   ├── cards/           # Componentes de Cartões
│   ├── transactions/    # Componentes de Transações
│   └── profile/         # Componentes de Perfil
├── pages/               # Páginas (apenas composição)
├── hooks/               # Custom hooks
├── services/            # Lógica de negócio/API
├── styles/              # Estilos globais e tokens
├── types/               # TypeScript types
└── utils/               # Helpers e formatters
```

## 🎨 Design System

O projeto utiliza um design system baseado em tokens:

- **Cores Semânticas**: primary, secondary, background, surface, text-primary, etc.
- **Cores Primitivas**: Escalas de gray e lime (50-900)
- **Espaçamentos**: Sistema baseado em 4px (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16)
- **Tipografia**: Font families, sizes, weights e line-heights
- **Shape**: Border radius, shadows, borders

## 📐 Breakpoints

- **Mobile**: < 768px (base)
- **Tablet**: ≥ 768px
- **Desktop**: ≥ 1280px
- **Wide/4K**: ≥ 1920px

## 🔧 Desenvolvimento

O projeto segue princípios de:

- **Mobile-first**: Base sempre mobile, breakpoints apenas evoluem
- **Layout fluido**: Containers com `width: 100%`, `max-width` para limitação
- **Componentização**: Atomic Design (Átomos → Moléculas → Organismos → Templates)
- **Separação de responsabilidades**: Páginas (composição), Componentes (UI), Hooks (estado), Services (lógica)
