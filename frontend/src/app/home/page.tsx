import { checkIfProfileCreated } from "@/api/profile";
import { Loading } from "@/components/loading";
import ProfileDetailsModal from "@/components/profile-details-modal";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "react-query";
import UploadDialog from "@/components/upload-post";
import { usePosts } from "@/hooks/usePost";
import ProfileHeader from "@/components/profile-header";
import Feed from "@/components/feed";

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

  return (
    <>
      <ProfileDetailsModal
        user_id={user?.id ?? ""}
        showModal={!isProfileCreated}
      />

      <main className="flex w-screen gap-4 h-screen flex-col items-center justify-center">
        <div className="flex flex-col max-h-[1000px] w-[825px] gap-4">
          <ProfileHeader user_id={user?.id ?? ""} />
          
          <Feed posts={posts} />

          <UploadDialog />
        </div>
      </main>
    </>
  );
}
