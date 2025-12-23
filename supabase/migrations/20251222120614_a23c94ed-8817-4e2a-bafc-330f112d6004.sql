-- Remover views anteriores
DROP VIEW IF EXISTS public.community_posts_safe;
DROP VIEW IF EXISTS public.circles_safe;

-- Recriar view para community_posts com security_invoker (respeita RLS do usuário)
CREATE VIEW public.community_posts_safe 
WITH (security_invoker = true)
AS
SELECT 
  id,
  created_at,
  content,
  anonymous_name,
  mood,
  hearts_count
FROM public.community_posts;

-- Recriar view para circles com security_invoker
CREATE VIEW public.circles_safe 
WITH (security_invoker = true)
AS
SELECT 
  id,
  created_at,
  name,
  description,
  theme,
  is_public
FROM public.circles
WHERE is_public = true;

-- Conceder permissões
GRANT SELECT ON public.community_posts_safe TO authenticated;
GRANT SELECT ON public.circles_safe TO authenticated;
GRANT SELECT ON public.community_posts_safe TO anon;
GRANT SELECT ON public.circles_safe TO anon;