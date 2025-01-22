import { checkIfProfileCreated } from "@/api/profile";
import { Loading } from "@/components/loading";
import ProfileDetailsModal from "@/components/profile-details-modal";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "react-query";
import SignOutButton from "@/components/signout-button";
import UploadDialog from "@/components/upload-post";

export default function HomePage() {
  const { user } = useUser();

  const { data: isProfileCreated, isLoading } = useQuery(
    ["profileCreated", user?.id],
    () => checkIfProfileCreated(user!.id),
    {
      enabled: !!user?.id,
    }
  );

  if (isLoading || isProfileCreated === undefined) {
    return <Loading loading={isLoading} />;
  }

  return (
    <>
      <ProfileDetailsModal
        user_id={user?.id ?? ""}
        showModal={!isProfileCreated}
      />
      
      <main className="flex w-screen h-screen flex-col items-center justify-center">
        <UploadDialog />
        <SignOutButton />
      </main>
    </>
  );
}
