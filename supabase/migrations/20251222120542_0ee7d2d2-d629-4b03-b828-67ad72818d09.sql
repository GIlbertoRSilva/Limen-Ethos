-- Criar view segura para community_posts que oculta user_id
CREATE OR REPLACE VIEW public.community_posts_safe AS
SELECT 
  id,
  created_at,
  content,
  anonymous_name,
  mood,
  hearts_count
FROM public.community_posts;

-- Criar view segura para circles que oculta created_by
CREATE OR REPLACE VIEW public.circles_safe AS
SELECT 
  id,
  created_at,
  name,
  description,
  theme,
  is_public
FROM public.circles
WHERE is_public = true;

-- Permitir que usuários autenticados vejam as views
GRANT SELECT ON public.community_posts_safe TO authenticated;
GRANT SELECT ON public.circles_safe TO authenticated;

-- Permitir acesso anônimo também (para visualização sem login)
GRANT SELECT ON public.community_posts_safe TO anon;
GRANT SELECT ON public.circles_safe TO anon;