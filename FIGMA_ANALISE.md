# 🎨 ANÁLISE DO DESIGN FIGMA - MYCASH+

## Link do Projeto
**Figma:** https://www.figma.com/design/96bKpxRMOgtZDE5KFd2HCX/Workshop---Do-figma-MCP-ao-Cursor-AI-v.3--Community---Copy-?node-id=42-3096&t=gqE34riow6Qn0ieP-4

---

## 📋 INSTRUÇÕES PARA ACESSO VIA FIGMA MCP

Para completar esta análise, é necessário:

1. **Abrir o arquivo Figma no Figma Desktop**
2. **Selecionar as telas/frames** que deseja analisar:
   - Dashboard
   - Cartões
   - Transações
   - Perfil
3. **Manter a seleção ativa** enquanto a análise é realizada

OU

1. **Fornecer acesso via Figma MCP Remote** (se configurado)
2. **Usar o link do arquivo** para extrair informações

---

## 🔍 ANÁLISE A SER REALIZADA

### 1. Componentes Visuais por Tela

#### **Dashboard**
- [ ] Estrutura de layout (Sidebar, Header, Main)
- [ ] Cards de métricas (Saldo, Receitas, Despesas)
- [ ] Gráficos e visualizações
- [ ] Lista de transações recentes
- [ ] Ações rápidas/CTAs
- [ ] Filtros e controles
- [ ] Outros elementos específicos

#### **Cartões**
- [ ] Lista de cartões
- [ ] Card individual (design, informações)
- [ ] Modal/detalhes do cartão
- [ ] Formulário de adicionar/editar
- [ ] Ações (ativar, bloquear, excluir)
- [ ] Filtros e busca
- [ ] Estados (ativo, bloqueado, etc.)

#### **Transações**
- [ ] Lista de transações
- [ ] Item de transação (layout, informações)
- [ ] Filtros (data, categoria, tipo, valor)
- [ ] Formulário de nova transação
- [ ] Paginação ou infinite scroll
- [ ] Agrupamentos (por data, categoria)
- [ ] Ações (editar, excluir, duplicar)

#### **Perfil**
- [ ] Header do perfil (avatar, nome, informações básicas)
- [ ] Formulário de edição
- [ ] Seções de configurações
- [ ] Preferências e notificações
- [ ] Segurança e privacidade
- [ ] Outros elementos

### 2. Hierarquia Visual

- [ ] Níveis de importância (tamanhos, cores, espaçamentos)
- [ ] Agrupamentos visuais (cards, seções)
- [ ] Fluxo de leitura (F-pattern, Z-pattern)
- [ ] Peso visual (tipografia, cores, sombras)
- [ ] Espaçamento negativo (whitespace)

---

## 🎨 VARIÁVEIS DO DESIGN SYSTEM

### Variáveis Semânticas (a extrair)

#### **Cores Semânticas**
- [ ] `--color-primary` (cor principal da marca)
- [ ] `--color-secondary` (cor secundária)
- [ ] `--color-background` (fundo principal)
- [ ] `--color-surface` (superfície de cards/containers)
- [ ] `--color-text-primary` (texto principal)
- [ ] `--color-text-secondary` (texto secundário)
- [ ] `--color-text-tertiary` (texto terciário)
- [ ] `--color-border` (bordas)
- [ ] `--color-divider` (separadores)
- [ ] `--color-error` (erros)
- [ ] `--color-success` (sucesso)
- [ ] `--color-warning` (avisos)
- [ ] `--color-info` (informações)

#### **Espaçamentos Semânticos**
- [ ] `--spacing-container` (padding de containers principais)
- [ ] `--spacing-section` (espaçamento entre seções)
- [ ] `--spacing-card` (padding interno de cards)
- [ ] `--spacing-item` (espaçamento entre itens de lista)
- [ ] `--spacing-group` (espaçamento entre grupos)

#### **Tipografia Semântica**
- [ ] `--font-heading` (font-family para títulos)
- [ ] `--font-body` (font-family para corpo)
- [ ] `--font-mono` (font-family monoespaçada)
- [ ] `--text-heading-1` (título principal)
- [ ] `--text-heading-2` (subtítulo)
- [ ] `--text-body` (texto de corpo)
- [ ] `--text-caption` (legendas)
- [ ] `--text-label` (labels de formulários)

### Variáveis Primitivas (a extrair)

#### **Cores Primitivas**
- [ ] Escala de cinzas: `--gray-50` até `--gray-900`
- [ ] Cores primárias (ex: `--lime-50` até `--lime-900`)
- [ ] Outras famílias de cores (verde, azul, vermelho, etc.)

#### **Espaçamentos Primitivos**
- [ ] `--spacing-0` (0px)
- [ ] `--spacing-1` (4px)
- [ ] `--spacing-2` (8px)
- [ ] `--spacing-3` (12px)
- [ ] `--spacing-4` (16px)
- [ ] `--spacing-5` (20px)
- [ ] `--spacing-6` (24px)
- [ ] `--spacing-8` (32px)
- [ ] `--spacing-10` (40px)
- [ ] `--spacing-12` (48px)
- [ ] `--spacing-16` (64px)
- [ ] Outros valores da escala

#### **Tipografia Primitiva**
- [ ] `--font-family-base` (font-family padrão)
- [ ] `--font-size-xs` (ex: 12px)
- [ ] `--font-size-sm` (ex: 14px)
- [ ] `--font-size-base` (ex: 16px)
- [ ] `--font-size-lg` (ex: 18px)
- [ ] `--font-size-xl` (ex: 20px)
- [ ] `--font-size-2xl` (ex: 24px)
- [ ] `--font-size-3xl` (ex: 30px)
- [ ] `--font-size-4xl` (ex: 36px)
- [ ] `--font-weight-normal` (400)
- [ ] `--font-weight-medium` (500)
- [ ] `--font-weight-semibold` (600)
- [ ] `--font-weight-bold` (700)
- [ ] `--line-height-tight` (ex: 1.25)
- [ ] `--line-height-normal` (ex: 1.5)
- [ ] `--line-height-relaxed` (ex: 1.75)

#### **Shape (Bordas, Sombras)**
- [ ] `--radius-none` (0px)
- [ ] `--radius-sm` (ex: 4px)
- [ ] `--radius-md` (ex: 8px)
- [ ] `--radius-lg` (ex: 12px)
- [ ] `--radius-xl` (ex: 16px)
- [ ] `--radius-2xl` (ex: 24px)
- [ ] `--radius-full` (9999px)
- [ ] `--shadow-sm` (sombra pequena)
- [ ] `--shadow-md` (sombra média)
- [ ] `--shadow-lg` (sombra grande)
- [ ] `--shadow-xl` (sombra extra grande)
- [ ] `--border-width` (ex: 1px)
- [ ] `--border-color` (cor padrão de borda)

---

## 🧭 ESTRUTURA DE NAVEGAÇÃO

### Sidebar Desktop (≥1280px)

#### **Estado Expandido**
- [ ] Largura: _____px
- [ ] Elementos:
  - [ ] Logo/Branding (tamanho, posição)
  - [ ] Itens de navegação (ícone + texto)
  - [ ] Seções agrupadas (se houver)
  - [ ] Footer da sidebar (se houver)
- [ ] Espaçamentos:
  - [ ] Padding interno: _____px
  - [ ] Espaçamento entre itens: _____px
  - [ ] Espaçamento entre seções: _____px
- [ ] Estados:
  - [ ] Hover (cor, background, transformação)
  - [ ] Active (cor, background, indicador)
  - [ ] Disabled (opacidade, cursor)
- [ ] Transição para collapsed:
  - [ ] Duração: _____ms
  - [ ] Easing: _____

#### **Estado Colapsado**
- [ ] Largura: _____px
- [ ] Elementos:
  - [ ] Logo compacto (tamanho, posição)
  - [ ] Apenas ícones (tamanho, espaçamento)
  - [ ] Tooltips ao hover (posição, estilo)
- [ ] Espaçamentos:
  - [ ] Padding interno: _____px
  - [ ] Espaçamento entre itens: _____px
- [ ] Transição para expanded:
  - [ ] Duração: _____ms
  - [ ] Easing: _____

#### **Comportamento**
- [ ] Botão toggle:
  - [ ] Posição: _____
  - [ ] Estilo: _____
  - [ ] Ícone: _____
- [ ] Animação de transição:
  - [ ] Tipo: _____
  - [ ] Duração: _____ms
- [ ] Adaptação do conteúdo principal:
  - [ ] Margem esquerda ajusta automaticamente?
  - [ ] Transição suave?
- [ ] Persistência:
  - [ ] Salva estado no localStorage?
  - [ ] Estado padrão: expanded ou collapsed?

### Header Mobile (<1280px)

#### **Elementos**
- [ ] Logo/Branding:
  - [ ] Tamanho: _____px
  - [ ] Posição: _____
- [ ] Botão de menu (hamburger):
  - [ ] Tamanho: _____px
  - [ ] Posição: _____
  - [ ] Estilo: _____
- [ ] Ações principais:
  - [ ] Botão "+" (nova transação): _____
  - [ ] Outras ações: _____
- [ ] Altura do header: _____px
- [ ] Background: _____
- [ ] Sombras/bordas: _____

#### **Menu Drawer**
- [ ] Posição: lateral esquerda/direita
- [ ] Largura: _____px ou _____% da tela
- [ ] Overlay/backdrop:
  - [ ] Cor: _____
  - [ ] Opacidade: _____
- [ ] Itens de navegação:
  - [ ] Layout: _____
  - [ ] Espaçamento: _____px
- [ ] Animação:
  - [ ] Abertura: _____ (slide, fade, etc.)
  - [ ] Fechamento: _____
  - [ ] Duração: _____ms
- [ ] Fechamento:
  - [ ] Ao clicar fora: sim/não
  - [ ] Ao clicar em item: sim/não
  - [ ] Botão fechar: sim/não

### Transições entre Seções

- [ ] Tipo de transição:
  - [ ] Fade (opacidade)
  - [ ] Slide (horizontal/vertical)
  - [ ] Instantânea
  - [ ] Outra: _____
- [ ] Duração: _____ms
- [ ] Easing: _____
- [ ] Estados de loading:
  - [ ] Skeleton screens: sim/não
  - [ ] Spinner: sim/não
  - [ ] Outro: _____
- [ ] Scroll behavior:
  - [ ] Scroll para topo ao mudar de página: sim/não
  - [ ] Manter posição: sim/não

---

## 📐 ESPECIFICAÇÕES TÉCNICAS

### Layout
- [ ] Containers principais: largura fixa ou fluida?
- [ ] Max-width dos containers: _____px
- [ ] Padding dos containers: _____px
- [ ] Grid system: _____ colunas (desktop/tablet/mobile)

### Tipografia
- [ ] Font-family principal: _____
- [ ] Font-family secundária: _____
- [ ] Escala tipográfica: _____
- [ ] Line-height padrão: _____

### Cores
- [ ] Modo escuro: sim/não
- [ ] Paleta principal: _____
- [ ] Contraste mínimo: _____ (WCAG AA/AAA)

### Espaçamentos
- [ ] Sistema de espaçamento: _____ (4px, 8px, etc.)
- [ ] Espaçamento base: _____px

### Bordas e Sombras
- [ ] Border-radius padrão: _____px
- [ ] Sombra padrão: _____

---

## 📝 NOTAS E OBSERVAÇÕES

### Padrões Identificados
- [ ] Padrões de design recorrentes
- [ ] Componentes reutilizáveis identificados
- [ ] Inconsistências encontradas
- [ ] Melhorias sugeridas

### Dúvidas e Questões
- [ ] _____
- [ ] _____
- [ ] _____

---

## ✅ CHECKLIST DE VALIDAÇÃO

- [ ] Todos os componentes mapeados
- [ ] Todas as variáveis identificadas
- [ ] Navegação completamente analisada
- [ ] Especificações técnicas documentadas
- [ ] Arquitetura validada com o design
- [ ] Pronto para implementação
