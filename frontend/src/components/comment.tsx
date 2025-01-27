import { useUserProfile } from "@/hooks/useUserProfile";

interface CommentProps {
  user_id: string;
  comment: string;
}

export default function Comment({ user_id, comment }: CommentProps) {
  const { profile } = useUserProfile(user_id);

  return (
    <div className="flex flex-col">
      <span className="font-bold">@{profile?.username}</span>
      <span className="text-sm text-gray-500">{comment}</span>
    </div>
  );
}
