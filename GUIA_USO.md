# 📖 Guia de Uso - MYCash+ Dashboard

## 🚀 Início Rápido

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do Supabase

# Inicie o servidor de desenvolvimento
npm run dev
```

### Build para Produção

```bash
# Build
npm run build

# Preview do build
npm run preview
```

---

## 📱 Como Usar

### 1. Autenticação

1. Acesse a aplicação
2. Faça login com email e senha
3. Se não tiver conta, crie uma no Supabase

### 2. Dashboard

O Dashboard mostra:
- **Saldo Total**: Seu saldo atual
- **Receitas do Mês**: Total de receitas do mês atual
- **Despesas do Mês**: Total de despesas do mês atual
- **Economia do Mês**: Diferença entre receitas e despesas
- **Transações Recentes**: Últimas 5 transações
- **Gráficos**: Visualizações de receitas vs despesas e gastos por categoria

### 3. Transações

#### Criar Transação
1. Clique em "Nova Transação"
2. Preencha os campos:
   - Tipo (Receita/Despesa)
   - Descrição
   - Valor
   - Categoria
   - Data
3. Clique em "Criar"

#### Editar Transação
1. Clique na transação desejada
2. Modifique os campos
3. Clique em "Atualizar"

#### Excluir Transação
1. Clique no ícone de lixeira na transação
2. Confirme a exclusão

#### Buscar Transações
1. Use o campo de busca para filtrar por descrição ou categoria
2. Use os filtros de tipo e categoria

#### Exportar Transações
1. Clique em "CSV" ou "JSON" no botão de exportação
2. O arquivo será baixado automaticamente

### 4. Cartões

#### Criar Cartão
1. Clique em "Adicionar"
2. Preencha os campos:
   - Nome do Cartão
   - Número do Cartão
   - Tipo (Crédito/Débito)
   - Bandeira
   - Limite (apenas crédito)
3. Clique em "Criar"

#### Editar Cartão
1. Clique no cartão desejado
2. Modifique os campos
3. Clique em "Atualizar"

#### Excluir Cartão
1. Clique no ícone de lixeira no cartão
2. Confirme a exclusão

### 5. Perfil

1. Acesse a página "Perfil"
2. Edite suas informações:
   - Nome
   - E-mail
   - Telefone
3. Clique em "Salvar"

### 6. Modo Escuro

1. Clique no ícone de sol/lua no header ou sidebar
2. O tema será alternado automaticamente
3. A preferência é salva automaticamente

---

## ⌨️ Atalhos de Teclado

- `Esc` - Fechar modais
- `Tab` - Navegar entre elementos
- `Enter` - Confirmar ações em formulários

---

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase

Configure o Supabase seguindo o guia em `DEPLOY.md`:
1. Crie as tabelas
2. Configure RLS
3. Configure triggers

---

## 🐛 Solução de Problemas

### Erro de Autenticação
- Verifique se as variáveis de ambiente estão corretas
- Verifique se o RLS está configurado no Supabase

### Erro ao Carregar Dados
- Verifique a conexão com o Supabase
- Verifique o console do navegador para erros

### Modo Escuro Não Funciona
- Limpe o cache do navegador
- Verifique se o localStorage está habilitado

---

## 📚 Recursos Adicionais

- `README.md` - Informações gerais do projeto
- `DEPLOY.md` - Guia de deploy
- `CHECKLIST_PRODUCAO.md` - Checklist de produção
- `ENTREGA_FINAL.md` - Documentação de entrega

---

## 💡 Dicas

1. **Use filtros** para encontrar transações rapidamente
2. **Exporte dados** regularmente para backup
3. **Organize por categorias** para melhor controle
4. **Use o modo escuro** para economizar bateria em dispositivos OLED
5. **Instale como PWA** para acesso rápido

---

**Bom uso! 🎉**
