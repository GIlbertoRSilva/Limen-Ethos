-- Remove the policy that exposes all hearts to everyone
DROP POLICY IF EXISTS "Users can view hearts" ON public.post_hearts;

-- Create a new policy that only allows users to see their OWN hearts
-- This way they can check if they already liked a post, but can't see others' likes
CREATE POLICY "Users can view their own hearts" 
ON public.post_hearts 
FOR SELECT 
USING (auth.uid() = user_id);