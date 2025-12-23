-- Drop the existing view and recreate with proper columns
DROP VIEW IF EXISTS public.community_posts_safe;

-- Create a secure view for community posts that hides user_id
CREATE VIEW public.community_posts_safe AS
SELECT 
  id,
  content,
  created_at,
  anonymous_name,
  hearts_count,
  mood
FROM public.community_posts;

-- Grant access to the view
GRANT SELECT ON public.community_posts_safe TO authenticated;
GRANT SELECT ON public.community_posts_safe TO anon;

-- Create a function to check if user owns a post (for heart/delete operations)
CREATE OR REPLACE FUNCTION public.user_owns_post(_user_id uuid, _post_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.community_posts
    WHERE id = _post_id AND user_id = _user_id
  )
$$;