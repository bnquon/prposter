import { useUserProfile } from "@/hooks/useUserProfile";
import { weightText, ageText, isImage } from "../../utils/helpers";
import { PostTagBadge } from "./ui/tag-badge";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { useComments } from "@/hooks/useComments";
import { addComment } from "@/api/posts";
import { useQueryClient } from "react-query";
import Comment from "./comment";
import { useRef } from "react";
import { toast } from "sonner";

interface PostCardProps {
  user_id: string;
  caption: string;
  media: string;
  tags: string[];
  file_type: string;
  post_id: number;
}

export default function PostCard({
  user_id,
  caption,
  media,
  tags,
  file_type,
  post_id,
}: PostCardProps) {
  const queryClient = useQueryClient();
  const { profile } = useUserProfile(user_id);
  const { comments } = useComments(post_id);
  const commentRef = useRef<HTMLInputElement>(null);

  const handleAddComment = async () => {
    const comment = commentRef.current?.value;

    if (comment === "") {
      toast.error("Comment cannot be empty");
      return;
    } else {
      try {
        await addComment(comment!, user_id, post_id);
        commentRef.current!.value = "";
        await queryClient.invalidateQueries(["comments", post_id]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex h-full w-full snap-start flex-row">
      {/* Media Section (60% width) */}
      <div className="flex-[3] bg-black overflow-hidden">
        {isImage(file_type) ? (
          <img src={media} alt="media" className="w-full h-full object-cover" />
        ) : (
          <video src={media} controls className="w-full h-full object-cover" />
        )}
      </div>

      {/* Profile and Caption Section (40% width) */}
      <div className="flex-[2] h-full bg-[#F5F5F5] flex flex-col justify-between p-6 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {/* Profile Info */}
          <div className="flex flex-col">
            <span className="font-bold text-xl">@{profile?.username}</span>
            <div className="text-md text-gray-500">
              {weightText(profile?.weight)}, {ageText(profile?.age)}
            </div>
          </div>

          {/* Caption */}
          <div className="text-lg text-gray-800 border-b border-gray-300 max-h-[40%] overflow-y-auto">
            {caption}
          </div>

          {/* Placeholder Comments */}
          <div className="max-h-[75%] flex flex-col gap-2 overflow-y-auto">
            <div className="text-md text-gray-600 font-semibold">
              Comments
            </div>
            {comments?.map((comment: { comment_id: number; user_id: string; comment: string }) => (
              <Comment
                key={comment.comment_id}
                user_id={comment.user_id}
                comment={comment.comment}
              />
            ))}
          </div>
        </div>

        {/* Input for Adding Comments */}
        <div className="mt-auto">
          <Label htmlFor="comments">Add comment</Label>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input ref={commentRef} type="text" placeholder="Comment..." />
            <Button onClick={handleAddComment} type="submit">
              <Upload className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <PostTagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
