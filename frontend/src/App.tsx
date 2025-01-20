import { useState, useEffect } from "react";
import supabase from "../utils/supabase"
import "./App.css";
import { Session } from "@supabase/supabase-js";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const googleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  console.log(session);

  if (!session) {
    return <button style={{ backgroundColor: "red" }} onClick={googleLogin}>GOOGLE LOG IN</button>;
  } else {
    return <div>Logged in!</div>;
  }
}
