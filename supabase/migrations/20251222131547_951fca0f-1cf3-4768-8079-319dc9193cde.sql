-- Drop the problematic policy that exposes waiting requests
DROP POLICY IF EXISTS "Users can view waiting requests to match" ON public.listening_requests;

-- Create a safe view that only exposes minimal info needed for matching
-- This hides the requester_id, created_at timestamp, and message to prevent pattern analysis
CREATE OR REPLACE VIEW public.listening_requests_available AS
SELECT 
  id,
  mood,
  status
FROM public.listening_requests
WHERE status = 'waiting';

-- Grant access to the view
GRANT SELECT ON public.listening_requests_available TO authenticated;
GRANT SELECT ON public.listening_requests_available TO anon;

-- Create a function to check if there are waiting requests (without exposing details)
CREATE OR REPLACE FUNCTION public.has_waiting_requests()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.listening_requests
    WHERE status = 'waiting'
    AND requester_id <> auth.uid()
  )
$$;

-- Create a function to match with a waiting request (returns the request id if successful)
CREATE OR REPLACE FUNCTION public.match_listening_request(_mood text DEFAULT NULL)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  matched_id uuid;
BEGIN
  -- Find a waiting request (optionally filtered by mood) and claim it
  UPDATE public.listening_requests
  SET 
    listener_id = auth.uid(),
    status = 'matched',
    matched_at = now()
  WHERE id = (
    SELECT id FROM public.listening_requests
    WHERE status = 'waiting'
    AND requester_id <> auth.uid()
    AND (_mood IS NULL OR mood::text = _mood)
    ORDER BY created_at ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED
  )
  RETURNING id INTO matched_id;
  
  RETURN matched_id;
END;
$$;