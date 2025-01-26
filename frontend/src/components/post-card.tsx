import { useUserProfile } from "@/hooks/useUserProfile";
import { weightText, ageText, isImage } from "../../utils/helpers";
import { PostTagBadge } from "./ui/tag-badge";

interface PostCardProps {
  user_id: string;
  caption: string;
  media: string;
  tags: string[];
  file_type: string;
}

export default function PostCard({
  user_id,
  caption,
  media,
  tags,
  file_type,
}: PostCardProps) {
  const { profile } = useUserProfile(user_id);

  console.log(profile);

  return (
    <div className="w-[825px] max-h-[425px] p-6 bg-[#F5F5F5] rounded-xl shadow flex box-border gap-4">
      <div className="w-[450px] h-auto overflow-hidden rounded-xl">
        {isImage(file_type) ? (
          <img src={media} alt="media" className="object-cover w-full h-full" />
        ) : (
          <video src={media} controls className="object-cover w-full h-full" />
        )}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col">
          <span className="font-bold text-lg">@{profile?.username}</span>
          <div className="text-sm text-gray-500">
            {weightText(profile?.weight)}, {ageText(profile?.age)}
          </div>
        </div>
        <div className="mt-4">
          {caption} {file_type}
        </div>
        <div className="mt-auto ml-auto">
          {tags.map((tag: string) => (
            <PostTagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
