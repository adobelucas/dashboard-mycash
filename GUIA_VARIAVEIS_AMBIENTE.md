# 🔐 Guia de Variáveis de Ambiente - Vercel

## 📋 Como Verificar e Configurar Variáveis de Ambiente no Vercel

### 1. Acesse o Dashboard do Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login na sua conta
3. Selecione o projeto **dashboard-mycash**

### 2. Verificar Variáveis de Ambiente

1. No menu lateral, clique em **Settings**
2. No menu superior, clique em **Environment Variables**
3. Você verá uma lista de todas as variáveis configuradas

### 3. Adicionar/Editar Variáveis de Ambiente

#### Se as variáveis NÃO existirem:

1. Clique em **Add New**
2. Preencha:
   - **Key**: `VITE_SUPABASE_URL`
   - **Value**: Cole a URL do seu projeto Supabase
   - **Environment**: Selecione todas (Production, Preview, Development)
3. Clique em **Save**
4. Repita para `VITE_SUPABASE_ANON_KEY`

#### Se as variáveis JÁ existirem:

1. Clique na variável para editar
2. Verifique se o valor está correto
3. Verifique se está habilitada para o ambiente correto (Production, Preview, Development)

### 4. Onde Obter as Credenciais do Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login e selecione seu projeto
3. Vá em **Settings** → **API**
4. Você encontrará:
   - **Project URL** → Use para `VITE_SUPABASE_URL`
   - **anon public** key → Use para `VITE_SUPABASE_ANON_KEY`

### 5. Verificar se Estão Funcionando

Após configurar, faça um novo deploy:

1. No Vercel, vá em **Deployments**
2. Clique nos três pontos (...) do último deployment
3. Selecione **Redeploy**
4. Ou faça um novo commit para trigger automático

### 6. Verificar nos Logs do Build

1. Vá em **Deployments**
2. Clique no deployment mais recente
3. Clique em **Build Logs**
4. Procure por erros relacionados a variáveis de ambiente

Se você ver erros como:
- `VITE_SUPABASE_URL is not defined`
- `Cannot read property 'env' of undefined`

Significa que as variáveis não estão configuradas corretamente.

---

## 🔍 Verificação Local

### Criar arquivo .env localmente

1. Crie um arquivo `.env` na raiz do projeto (mesmo nível do `package.json`)
2. Adicione:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **IMPORTANTE**: O arquivo `.env` está no `.gitignore` e NÃO será commitado

### Testar localmente

```bash
npm run dev
```

Se as variáveis estiverem corretas, a aplicação deve iniciar sem erros.

---

## ⚠️ Importante

- **NUNCA** commite o arquivo `.env` com valores reais
- Use `.env.example` como template (sem valores sensíveis)
- As variáveis no Vercel são seguras e não são expostas no código
- Após adicionar/editar variáveis no Vercel, é necessário fazer um novo deploy

---

## 📝 Checklist

- [ ] Variáveis configuradas no Vercel
- [ ] `VITE_SUPABASE_URL` configurada
- [ ] `VITE_SUPABASE_ANON_KEY` configurada
- [ ] Variáveis habilitadas para Production, Preview e Development
- [ ] Novo deploy realizado após configurar
- [ ] Build passou sem erros relacionados a variáveis

---

## 🆘 Troubleshooting

### Erro: "VITE_SUPABASE_URL is not defined"

**Solução:**
1. Verifique se a variável está configurada no Vercel
2. Verifique se o nome está correto (case-sensitive)
3. Faça um novo deploy após adicionar a variável

### Erro: "Cannot read property 'env' of undefined"

**Solução:**
1. Verifique se o arquivo `src/vite-env.d.ts` existe
2. Verifique se as variáveis estão no formato correto (`VITE_*`)

### Build funciona localmente mas falha no Vercel

**Solução:**
1. Verifique se as variáveis estão configuradas no Vercel (não apenas localmente)
2. Verifique se as variáveis estão habilitadas para o ambiente correto
3. Faça um novo deploy

---

**Precisa de ajuda?** Consulte a [documentação do Vercel sobre variáveis de ambiente](https://vercel.com/docs/concepts/projects/environment-variables)
