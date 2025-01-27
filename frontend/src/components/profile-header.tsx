import { useUserProfile } from "@/hooks/useUserProfile";
import SignOutButton from "./signout-button";

interface ProfileHeaderProps {
  user_id: string;
}

export default function ProfileHeader({ user_id }: ProfileHeaderProps) {
  const { profile } = useUserProfile(user_id);

  return (
    <div className="flex w-full justify-between items-center">
      <div className="text-2xl font-bold">
        Welcome @{profile?.username}
      </div>
      <SignOutButton />
    </div>
  );
}
