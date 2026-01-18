-- ============================================
-- MYCASH+ v2.0 - Storage Buckets Setup
-- ============================================

-- Criar bucket para avatares
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Criar bucket para anexos
INSERT INTO storage.buckets (id, name, public)
VALUES ('attachments', 'attachments', false)
ON CONFLICT (id) DO NOTHING;

-- Políticas para bucket avatars (público para leitura, autenticado para upload)
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Anyone can upload an avatar"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Anyone can update own avatar"
ON storage.objects FOR UPDATE
USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Anyone can delete own avatar"
ON storage.objects FOR DELETE
USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- Políticas para bucket attachments (autenticado para leitura/upload)
CREATE POLICY "Authenticated users can view attachments"
ON storage.objects FOR SELECT
USING (bucket_id = 'attachments' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload attachments"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'attachments' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update attachments"
ON storage.objects FOR UPDATE
USING (bucket_id = 'attachments' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete attachments"
ON storage.objects FOR DELETE
USING (bucket_id = 'attachments' AND auth.role() = 'authenticated');
