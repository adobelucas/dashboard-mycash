# 🔍 Verificação de Variáveis de Ambiente

## ✅ Variáveis Configuradas

### 1. VITE_SUPABASE_URL
**Valor:** `https://ofgvrmidtzkkzybupymp.supabase.co`

**Status:** ✅ **CORRETO**
- Formato válido de URL do Supabase
- Protocolo HTTPS correto
- Domínio Supabase válido

---

### 2. VITE_SUPABASE_ANON_KEY
**Valor:** `sb_publishable_jYS4SQE8c4On1W9EkQyQSQ_rQY-HLQR`

**Status:** ⚠️ **ATENÇÃO - Pode estar incorreto**

**Problema identificado:**
- A chave começa com `sb_publishable_` que é uma **Publishable Key** do Supabase
- O código espera uma **anon public key** (anon key)
- As anon keys tradicionais geralmente começam com `eyJ` (são JWT tokens) e são muito mais longas

---

## 🔧 Como Corrigir

### Passo 1: Acesse o Supabase Dashboard
1. Acesse [supabase.com](https://supabase.com)
2. Faça login e selecione seu projeto
3. Vá em **Settings** → **API**

### Passo 2: Encontre a Chave Correta
No painel de API, você verá:

**Project API keys:**
- **anon public** → Esta é a chave que você precisa usar
- **service_role** → NÃO use esta (é privada)
- **publishable** → Esta é a que você está usando (pode funcionar, mas não é a padrão)

### Passo 3: Use a Chave "anon public"
A chave **anon public** geralmente:
- Começa com `eyJ` (é um JWT token)
- É muito mais longa (centenas de caracteres)
- Tem formato similar a: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mZ3ZybWlkdHpremt6eWJ1cHltcCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzE2MjM0NTY3LCJleHAiOjIwMzE4MTA1Njd9.xxxxx...`

### Passo 4: Atualize no Vercel
1. No Vercel, vá em **Settings** → **Environment Variables**
2. Edite `VITE_SUPABASE_ANON_KEY`
3. Cole a chave **anon public** completa
4. Salve
5. Faça um novo deploy

---

## ⚠️ Diferença entre as Chaves

### Publishable Key (`sb_publishable_...`)
- Chave mais nova do Supabase
- Pode funcionar em alguns casos
- Não é a chave padrão recomendada

### Anon Public Key (`eyJ...`)
- Chave tradicional e recomendada
- Formato JWT
- Mais longa e segura
- **Esta é a que você deve usar**

---

## ✅ Checklist Final

- [ ] `VITE_SUPABASE_URL` está correto ✅
- [ ] `VITE_SUPABASE_ANON_KEY` está usando a chave **anon public** (não publishable)
- [ ] Ambas as variáveis estão configuradas no Vercel
- [ ] Variáveis habilitadas para Production, Preview e Development
- [ ] Novo deploy realizado após atualizar

---

## 🧪 Como Testar

Após atualizar, teste se está funcionando:

1. Faça um novo deploy no Vercel
2. Acesse a aplicação
3. Tente fazer login
4. Se funcionar, as variáveis estão corretas!

---

**Nota:** Se a chave `sb_publishable_...` funcionar, pode continuar usando. Mas o recomendado é usar a chave **anon public** tradicional.
