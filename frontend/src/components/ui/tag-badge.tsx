import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export const PostTagBadge = ({ tag }: { tag: string }) => {
  let color;
  switch (tag) {
    case "weights":
      color = "bg-[#2563eb]";
      break;
    case "cardio":
      color = "bg-[#f97316]";
      break;
    case "yoga":
      color = "bg-[#8b9467]";
      break;
    default:
      color = "bg-[#f8e231]";
  }

  return (
    <Badge className={cn("text-white", color)}>
      {tag.charAt(0).toUpperCase() + tag.slice(1)}
    </Badge>
  );
};
