-- Fix Security Definer View warnings by setting views to SECURITY INVOKER
-- This ensures the views respect the RLS policies of the querying user

ALTER VIEW public.circles_safe SET (security_invoker = on);
ALTER VIEW public.community_posts_safe SET (security_invoker = on);
ALTER VIEW public.listening_requests_available SET (security_invoker = on);