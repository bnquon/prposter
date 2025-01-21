import { Loading } from "@/components/loading";
import ProfileDetailsModal from "@/components/profile-details-modal";
import { useUser } from "@/hooks/useUser";

export default function HomePage() {
  const { user, loading } = useUser();

  if (loading) {
    return <Loading loading={loading} />;
  }

  if (user) {
    return <ProfileDetailsModal open={true} setOpen={() => {}} email={user.email ?? ""} />;
  }

  return (
    <main className="flex w-screen h-screen flex-col items-center justify-center">
      check if logged in and show popup
    </main>
  );
}
