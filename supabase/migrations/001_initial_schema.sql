-- ============================================
-- MYCASH+ v2.0 - Schema Inicial Completo
-- Baseado no schema Prisma fornecido
-- ============================================

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE transaction_type AS ENUM ('INCOME', 'EXPENSE');
CREATE TYPE account_type AS ENUM ('CHECKING', 'SAVINGS', 'CREDIT_CARD');
CREATE TYPE recurrence_frequency AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');
CREATE TYPE transaction_status AS ENUM ('PENDING', 'COMPLETED');

-- ============================================
-- TABELAS
-- ============================================

-- 1. USERS - Conta autenticada
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 2. FAMILY_MEMBERS - Membros da família
CREATE TABLE public.family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar_url TEXT,
  monthly_income DECIMAL(12, 2) DEFAULT 0 NOT NULL,
  color TEXT DEFAULT '#3247FF' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 3. CATEGORIES - Categorias de transações
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '📌' NOT NULL,
  type transaction_type NOT NULL,
  color TEXT DEFAULT '#3247FF' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 4. ACCOUNTS - Contas e cartões unificados
CREATE TABLE public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type account_type NOT NULL,
  name TEXT NOT NULL,
  bank TEXT NOT NULL,
  last_digits TEXT,
  holder_id UUID NOT NULL REFERENCES public.family_members(id) ON DELETE RESTRICT,
  
  -- Campos para CHECKING e SAVINGS
  balance DECIMAL(12, 2) DEFAULT 0 NOT NULL,
  
  -- Campos para CREDIT_CARD
  credit_limit DECIMAL(12, 2),
  current_bill DECIMAL(12, 2) DEFAULT 0 NOT NULL,
  due_day INT CHECK (due_day IS NULL OR (due_day >= 1 AND due_day <= 31)),
  closing_day INT CHECK (closing_day IS NULL OR (closing_day >= 1 AND closing_day <= 31)),
  theme TEXT DEFAULT 'black',
  logo_url TEXT,
  
  color TEXT DEFAULT '#3247FF' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 5. TRANSACTIONS - Transações completas
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type transaction_type NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  account_id UUID REFERENCES public.accounts(id) ON DELETE SET NULL,
  member_id UUID REFERENCES public.family_members(id) ON DELETE SET NULL,
  
  -- Parcelamento (máximo 12 parcelas)
  installment_number INT CHECK (installment_number IS NULL OR (installment_number >= 1 AND installment_number <= 12)),
  total_installments INT DEFAULT 1 CHECK (total_installments >= 1 AND total_installments <= 12) NOT NULL,
  parent_transaction_id UUID REFERENCES public.transactions(id) ON DELETE CASCADE,
  
  -- Recorrência
  is_recurring BOOLEAN DEFAULT false NOT NULL,
  recurring_transaction_id UUID REFERENCES public.recurring_transactions(id) ON DELETE SET NULL,
  
  -- Status
  status transaction_status DEFAULT 'COMPLETED' NOT NULL,
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Constraint: Se is_recurring = true, total_installments deve ser 1
  CONSTRAINT check_recurring_no_installments CHECK (
    (is_recurring = false) OR (is_recurring = true AND total_installments = 1)
  )
);

-- 6. RECURRING_TRANSACTIONS - Templates de recorrência
CREATE TABLE public.recurring_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type transaction_type DEFAULT 'EXPENSE' NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  account_id UUID REFERENCES public.accounts(id) ON DELETE SET NULL,
  member_id UUID REFERENCES public.family_members(id) ON DELETE SET NULL,
  
  -- Configuração de recorrência
  frequency recurrence_frequency NOT NULL,
  day_of_month INT CHECK (day_of_month IS NULL OR (day_of_month >= 1 AND day_of_month <= 31)),
  day_of_week INT CHECK (day_of_week IS NULL OR (day_of_week >= 0 AND day_of_week <= 6)),
  start_date DATE NOT NULL,
  end_date DATE,
  
  is_active BOOLEAN DEFAULT true NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ============================================
-- ÍNDICES
-- ============================================

-- Users
CREATE INDEX idx_users_email ON public.users(email);

-- Family Members
CREATE INDEX idx_family_members_user_id ON public.family_members(user_id);

-- Categories
CREATE INDEX idx_categories_user_id_type ON public.categories(user_id, type);

-- Accounts
CREATE INDEX idx_accounts_user_id_type ON public.accounts(user_id, type);
CREATE INDEX idx_accounts_holder_id ON public.accounts(holder_id);

-- Transactions
CREATE INDEX idx_transactions_user_id_date ON public.transactions(user_id, date);
CREATE INDEX idx_transactions_category_id ON public.transactions(category_id);
CREATE INDEX idx_transactions_account_id ON public.transactions(account_id);
CREATE INDEX idx_transactions_member_id ON public.transactions(member_id);
CREATE INDEX idx_transactions_recurring_transaction_id ON public.transactions(recurring_transaction_id);
CREATE INDEX idx_transactions_parent_transaction_id ON public.transactions(parent_transaction_id);
CREATE INDEX idx_transactions_status ON public.transactions(status);

-- Recurring Transactions
CREATE INDEX idx_recurring_transactions_user_id_is_active ON public.recurring_transactions(user_id, is_active);
CREATE INDEX idx_recurring_transactions_category_id ON public.recurring_transactions(category_id);
CREATE INDEX idx_recurring_transactions_account_id ON public.recurring_transactions(account_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recurring_transactions ENABLE ROW LEVEL SECURITY;

-- Políticas permissivas: todos podem acessar todas as tabelas

-- Users
CREATE POLICY "Allow all SELECT on users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow all INSERT on users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all UPDATE on users" ON public.users FOR UPDATE USING (true);
CREATE POLICY "Allow all DELETE on users" ON public.users FOR DELETE USING (true);

-- Family Members
CREATE POLICY "Allow all SELECT on family_members" ON public.family_members FOR SELECT USING (true);
CREATE POLICY "Allow all INSERT on family_members" ON public.family_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all UPDATE on family_members" ON public.family_members FOR UPDATE USING (true);
CREATE POLICY "Allow all DELETE on family_members" ON public.family_members FOR DELETE USING (true);

-- Categories
CREATE POLICY "Allow all SELECT on categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow all INSERT on categories" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all UPDATE on categories" ON public.categories FOR UPDATE USING (true);
CREATE POLICY "Allow all DELETE on categories" ON public.categories FOR DELETE USING (true);

-- Accounts
CREATE POLICY "Allow all SELECT on accounts" ON public.accounts FOR SELECT USING (true);
CREATE POLICY "Allow all INSERT on accounts" ON public.accounts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all UPDATE on accounts" ON public.accounts FOR UPDATE USING (true);
CREATE POLICY "Allow all DELETE on accounts" ON public.accounts FOR DELETE USING (true);

-- Transactions
CREATE POLICY "Allow all SELECT on transactions" ON public.transactions FOR SELECT USING (true);
CREATE POLICY "Allow all INSERT on transactions" ON public.transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all UPDATE on transactions" ON public.transactions FOR UPDATE USING (true);
CREATE POLICY "Allow all DELETE on transactions" ON public.transactions FOR DELETE USING (true);

-- Recurring Transactions
CREATE POLICY "Allow all SELECT on recurring_transactions" ON public.recurring_transactions FOR SELECT USING (true);
CREATE POLICY "Allow all INSERT on recurring_transactions" ON public.recurring_transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all UPDATE on recurring_transactions" ON public.recurring_transactions FOR UPDATE USING (true);
CREATE POLICY "Allow all DELETE on recurring_transactions" ON public.recurring_transactions FOR DELETE USING (true);

-- ============================================
-- FUNCTIONS E TRIGGERS
-- ============================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_family_members_updated_at
  BEFORE UPDATE ON public.family_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at
  BEFORE UPDATE ON public.accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recurring_transactions_updated_at
  BEFORE UPDATE ON public.recurring_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Função para sincronizar auth.users com public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar user em public.users quando criar em auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
