import { SignupForm } from "@/components/signup-form";
import { useUser } from "@/hooks/useUser";

export default function SignupPage() {

  const { user } = useUser();
  if (user) {
    window.location.href = "/home";
  }

  return (
    <div className="flex w-screen min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover z-[1]"
      >
        <source src="prposter_bg.mp4" type="video/mp4" />
      </video>
      <div className="flex w-full max-w-sm flex-col gap-6 z-10">
        <SignupForm />
      </div>
    </div>
  );
}
