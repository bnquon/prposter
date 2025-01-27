import PostCard from "./post-card";
import { Post } from "utils/types";

export default function Feed({ posts }: { posts: Post[] }) {
  return (
    <div className="h-[600px] w-full overflow-y-scroll snap-y snap-mandatory">
      {posts.map((post) => (
        <PostCard
          key={post.post_id}
          post_id={post.post_id}
          user_id={post.user_id}
          caption={post.caption}
          media={post.public_url}
          tags={post.tags}
          file_type={post.file_type}
        />
      ))}
    </div>
  );
}
