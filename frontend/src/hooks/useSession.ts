import { useState, useEffect } from "react";
import supabase from "../../utils/supabase";
import { Session } from "@supabase/supabase-js";

export const useSession = (): { session: Session | null; loading: boolean } => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session || null);
      setLoading(false);
    };

    fetchSession();
  }, []);

  return { session, loading };
};
