import { getProfileBio } from "@/api/profile";
import { useQuery } from "react-query";

export const useUserProfile = (user_id: string) => {
  const { data: profile, isLoading } = useQuery(
    ["bio", user_id],
    () => getProfileBio(user_id),
    {
      enabled: !!user_id,
    }
  );

  return { profile, isLoading };
};
