import { createClient } from '../../../util/supabase/client';
import { useState, useEffect } from 'react';

export const useUser = () => {
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, [supabase]);

  return { user, loading };
};