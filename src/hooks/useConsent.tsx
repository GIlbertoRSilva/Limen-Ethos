import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export function useConsent() {
  const { user } = useAuth();
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setHasConsented(null);
      setLoading(false);
      return;
    }

    const checkConsent = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('has_consented')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!error && data) {
        setHasConsented(data.has_consented);
      }
      setLoading(false);
    };

    checkConsent();
  }, [user]);

  const grantConsent = async () => {
    if (!user) return false;

    const { error } = await supabase
      .from('profiles')
      .update({
        has_consented: true,
        consent_date: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (!error) {
      setHasConsented(true);
      return true;
    }
    return false;
  };

  const revokeConsent = async () => {
    if (!user) return false;

    const { error } = await supabase
      .from('profiles')
      .update({
        has_consented: false,
        consent_date: null
      })
      .eq('user_id', user.id);

    if (!error) {
      setHasConsented(false);
      return true;
    }
    return false;
  };

  return { hasConsented, loading, grantConsent, revokeConsent };
}
