/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { PostTags, tags } from "../../utils/types";

interface CreatePostCaptionProps {
  register: any;
  captionError: any;
  tagError: any;
  selectedTags: string[];
  handleTagClick: (tags: PostTags) => void;
}

export default function CreatePostCaption({
  register,
  captionError,
  tagError,
  selectedTags,
  handleTagClick,
}: CreatePostCaptionProps) {

  return (
    <div className="grid gap-2">
      <Label htmlFor="message">Caption</Label>
      <Textarea
        {...register("caption")}
        rows={3}
        className="resize-none"
        placeholder="Add your caption here."
        id="message"
      />
      {captionError && <span className="text-red-500">{captionError.message}</span>}
      <div className="flex gap-2">
        {tags.map((tag: PostTags) => (
          <Badge
            className="border-[1px] border-gray-200 text-sm"
            onClick={() => handleTagClick(tag)}
            style={{
              padding: "5px 10px",
              cursor: "pointer",
              backgroundColor: selectedTags.includes(tag.id) ? "#2563eb" : "white",
              color: selectedTags.includes(tag.id) ? "white" : "black",
            }}
            key={tag.id}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
      {tagError && <span className="text-red-500">{tagError.message}</span>}
    </div>
  );
}
