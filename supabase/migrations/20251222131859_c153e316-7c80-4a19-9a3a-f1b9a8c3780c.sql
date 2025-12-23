-- Drop and recreate circles_safe view with explicit public filter
DROP VIEW IF EXISTS public.circles_safe;

CREATE VIEW public.circles_safe AS
SELECT 
  id,
  name,
  description,
  theme,
  is_public,
  created_at
FROM public.circles
WHERE is_public = true;

-- Ensure the view uses SECURITY INVOKER
ALTER VIEW public.circles_safe SET (security_invoker = on);

-- Grant access to authenticated users
GRANT SELECT ON public.circles_safe TO authenticated;
GRANT SELECT ON public.circles_safe TO anon;