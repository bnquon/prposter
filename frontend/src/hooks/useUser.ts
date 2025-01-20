import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import supabase from "../../utils/supabase";

export const useUser = (): { user: User | null; loading: boolean } => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};
