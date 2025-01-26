import { checkIfProfileCreated } from "@/api/profile";
import { Loading } from "@/components/loading";
import ProfileDetailsModal from "@/components/profile-details-modal";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "react-query";
import SignOutButton from "@/components/signout-button";
import UploadDialog from "@/components/upload-post";
import PostCard from "@/components/post-card";
import { usePosts } from "@/hooks/usePost";
import { Post } from "utils/types";

export default function HomePage() {
  const { user } = useUser();

  const { posts, isLoading: postsLoading } = usePosts();

  const { data: isProfileCreated, isLoading } = useQuery(
    ["profileCreated", user?.id],
    () => checkIfProfileCreated(user!.id),
    {
      enabled: !!user?.id,
    }
  );

  if (isLoading || isProfileCreated === undefined || postsLoading) {
    return <Loading loading={isLoading} />;
  }

  console.log(posts);

  return (
    <>
      <ProfileDetailsModal
        user_id={user?.id ?? ""}
        showModal={!isProfileCreated}
      />
      
      <main className="flex w-screen gap-4 h-screen flex-col items-center justify-center">
        <UploadDialog />
        {posts.map((post: Post) => (
          <PostCard
            key={post.post_id}
            user_id={post.user_id}
            caption={post.caption}
            media={post.public_url}
            tags={post.tags}
            file_type={post.file_type}
          />
        ))}
        <SignOutButton />
      </main>
    </>
  );
}
