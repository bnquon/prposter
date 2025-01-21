import supabase from "../../utils/supabase";
export const googleLogin = async () => {
  await supabase.auth.signInWithOAuth({ provider: "google" });
};

export const githubLogin = async () => {
  await supabase.auth.signInWithOAuth({ provider: "github" });
};

export const signUp = async (email: string, password: string) => {
  console.log(email, password); 
  const { data: { user }, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  } else {
    console.log(user);
  }
};

export const signIn = async (email: string, password: string) => {
  const { data: { user }, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  } else {
    console.log(user);
  }
};