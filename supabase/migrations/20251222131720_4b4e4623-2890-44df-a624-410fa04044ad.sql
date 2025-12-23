-- Remove the policy that exposes user_id to all authenticated users
DROP POLICY IF EXISTS "Anyone authenticated can view community posts" ON public.community_posts;

-- Create a new policy that only allows users to view their OWN posts (for management purposes)
-- All other reads should go through the community_posts_safe view
CREATE POLICY "Users can view their own posts" 
ON public.community_posts 
FOR SELECT 
USING (auth.uid() = user_id);